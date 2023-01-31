const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = (req, res, next) => {
  const { roomId } = req.params
  const { user } = req

  const exeptions = ["join"]

  try {
    prisma.room
      .findUnique({
        where: { id: parseInt(roomId) },
        include: { fkUsers: true, fkMessages: true },
      })
      .then((room) => {
        if (!room) return res.status(500).json({ error: "Room not found" })

        if (
          !(
            user.role == "ADMIN" ||
            exeptions.includes(req.url.split("/").slice(-1)[0])
          )
        )
          if (!room.fkUsers.some((usr) => usr.id === req.user.id)) {
            return res.status(500).json({ error: "User not in the room" })
          }

        req.room = room
        next()
      })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}
