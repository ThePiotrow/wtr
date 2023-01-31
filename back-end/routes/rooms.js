const { Router } = require("express")
const bcrypt = require("bcrypt-nodejs")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
// const sendEmail = require('../services.js/nodemailer');
const prisma = new PrismaClient()
const AuthMiddleware = require("../security/AuthMiddleware")
const RoomMiddleware = require("../security/RoomMiddleware")
const AdminMiddleware = require("../security/AdminMiddleware")

const router = Router()

router.get("/", AuthMiddleware, async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      where: { nbMaxUser: { gt: 2 } },
      include: { fkUsers: true },
    })
    res.json({
      available: rooms.filter(
        (room) =>
          room.fkUsers.length < room.nbMaxUser &&
          !req.user.fkRooms.some((r) => r.id === room.id)
      ),
      joined: rooms.filter((room) =>
        req.user.fkRooms.some((r) => r.id === room.id)
      ),
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
})

router.get("/:roomId", AuthMiddleware, RoomMiddleware, async (req, res) => {
  try {
    const { room } = req
    const Room = await prisma.room.findUnique({
      where: { id: room.id },
      include: { fkUsers: true, fkMessages: true },
    })

    res.json(Room)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
})

router.post("/", AuthMiddleware, async (req, res) => {
  try {
    const { name, fkUsers, fkOrganizer, nbMaxUser } = req.body
    const { user } = req

    if (user.role !== "ADMIN" && nbMaxUser > 2)
      return res.status(500).json({ error: "You cannot create this room" })

    const room = await prisma.room.create({
      data: {
        name,
        nbMaxUser,
      },
    })

    res.json(room)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
})

router.patch(
  "/:roomId/join",
  AuthMiddleware,
  RoomMiddleware,
  async (req, res) => {
    try {
      const { user, room } = req

      if (room.fkUsers.length >= room.nbMaxUser) {
        return res.status(500).json({ error: "Room is full" })
      }

      if (room.fkUsers.some((usr) => usr.id === user.id)) {
        return res.status(500).json({ error: "User already in room" })
      }

      const Room = await prisma.room.update({
        where: { id: room.id },
        data: {
          fkUsers: {
            connect: { id: user.id },
          },
        },
        include: { fkUsers: true },
      })

      res.json(Room)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Something went wrong" })
    }
  }
)

router.patch(
  "/:roomId/leave",
  AuthMiddleware,
  RoomMiddleware,
  async (req, res) => {
    try {
      const { user, room } = req

      const Room = await prisma.room.update({
        where: { id: room.id },
        data: {
          fkUsers: {
            disconnect: { id: user.id },
          },
        },
        include: { fkUsers: true },
      })

      res.json(Room)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Something went wrong" })
    }
  }
)

router.put("/:roomId", AuthMiddleware, RoomMiddleware, async (req, res) => {
  try {
    const { name, users, nbMaxUser } = req.body
    const { user, room } = req

    // if (user.role != 'ADMIN' && room.fkUsers.length > 2) return res.status(401).json({ error: 'Unauthorized' });

    const Users = users.reduce((acc, usr) => {
      acc.push({ id: usr })
      return acc
    }, [])

    const Room = await prisma.room.update({
      where: { id: room.id },
      data: {
        name,
        fkUsers: {
          disconnect: {
            NOT: Users.map((id) => ({ id })),
          },
          connect: Users,
        },
        nbMaxUser,
      },
      include: { fkUsers: true },
    })

    res.json(Room)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
})

router.delete("/:roomId", AuthMiddleware, RoomMiddleware, async (req, res) => {
  const { room } = req
  if (req.user.role !== "ADMIN" && room.fkUser.length > 2)
    return res.status(401).json({ error: "Unauthorized" })
  try {
    const Room = await prisma.room.delete({
      where: { id: room.id },
    })
    res.json(Room)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
})

router.post(
  "/:roomId/message",
  AuthMiddleware,
  RoomMiddleware,
  async (req, res) => {
    const { room } = req

    try {
      const { content } = req.body
      const { user } = req
      const message = await prisma.message.create({
        data: {
          content,
          fkSenderId: user.id,
          fkRoomId: room.id,
        },
      })
      res.json(message)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Something went wrong" })
    }
  }
)

router.get(
  "/:roomId/messages",
  AuthMiddleware,
  RoomMiddleware,
  async (req, res) => {
    const { room } = req

    try {
      const messages = await prisma.message.findMany({
        where: { fkRoom: room.id },
        orderBy: { createdAt: "desc" },
      })
      res.json(messages)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Something went wrong" })
    }
  }
)

router.patch(
  "/:roomId/messages/:messageId",
  AuthMiddleware,
  RoomMiddleware,
  async (req, res) => {
    try {
      const { content } = req.body

      if (
        !req.user.fkMessages.some(
          (message) => parseInt(req.params.messageId) == message.id
        )
      )
        return res
          .status(401)
          .json({ error: "Hey, that's not your message, buddy !" })

      const message = await prisma.message.update({
        where: { id: parseInt(req.params.messageId) },
        data: {
          content,
        },
      })
      res.json(message)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Something went wrong" })
    }
  }
)

router.delete(
  "/:roomId/messages/:messageId",
  AuthMiddleware,
  RoomMiddleware,
  AdminMiddleware,
  async (req, res) => {
    try {
      if (
        !req.user.fkMessages.some(
          (message) => parseInt(req.params.messageId) == message.id
        ) &&
        req.user.role !== "ADMIN"
      )
        return res
          .status(401)
          .json({ error: "Hey, that's not your message, buddy !" })

      const message = await prisma.message.delete({
        where: { id: parseInt(req.params.messageId) },
        include: { fkSender: true },
      })

      res.json(message)
    } catch (error) {
      console.log(error)

      res.status(500).json({ error: "Something went wrong" })
    }
  }
)

module.exports = router
