const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
// const sendEmail = require('../services.js/nodemailer');
const prisma = new PrismaClient();
const AuthMiddleware = require('../security/AuthMiddleware');
const RoomMiddleware = require('../security/RoomMiddleware');
const AdminMiddleware = require('../security/AdminMiddleware');

const router = Router();

router.get('/', AuthMiddleware, async (req, res) => {
    console.log(req.user);
    try {
        const rooms = await prisma.room.findMany({
            where: { nbMaxUser: { gt: 2 } },
            include: { fkUsers: true }
        });
        res.json({
            available: rooms.filter(room => room.fkUsers.length < room.nbMaxUser && !req.user.fkRooms.some(r => r.id === room.id)),
            joined: rooms.filter(room => req.user.fkRooms.some(r => r.id === room.id)),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:roomId', AuthMiddleware, RoomMiddleware, async (req, res) => {
    try {
        const room = await prisma.room.findUnique({
            where: { id: parseInt(req.room.id) },
            include: { fkUsers: true, fkMessages: true }
        });

        res.json(room);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/', AuthMiddleware, async (req, res) => {
    // if (req.user.role !== 'ADMIN') {
    //     return res.status(403).json({ error: 'Unauthorized' });
    // }
    try {
        const { name, fkUsers, fkOrganizer, nbMaxUser } = req.body;
        const room = await prisma.room.create({
            data: {
                name,
                nbMaxUser,
            }
        });

        res.json(room);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:roomId/join', AuthMiddleware, RoomMiddleware, async (req, res) => {
    try {
        const { user, room } = req;

        if (room.fkUsers.length >= room.nbMaxUser) {
            return res.status(500).json({ error: 'Room is full' });
        }

        if (room.fkUsers.some(usr => usr.id === user.id)) {
            return res.status(500).json({ error: 'User already in room' });
        }

        const Room = await prisma.room.update({
            where: { id: room.id },
            data: {
                fkUsers: {
                    connect: { id: user.id }
                }
            },
            include: { fkUsers: true }
        });

        res.json(Room);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:roomId/leave', AuthMiddleware, RoomMiddleware, async (req, res) => {
    try {
        const { user, room } = req;

        const Room = await prisma.room.update({
            where: { id: parseInt(room.id) },
            data: {
                fkUsers: {
                    disconnect: { id: user.id }
                }
            },
            include: { fkUsers: true }
        });

        res.json(Room);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.patch('/:roomId', AuthMiddleware, RoomMiddleware, async (req, res) => {
    try {
        const { name, users, fkOrganizer, nbMaxUser } = req.body;
        const { user, room } = req;

        if (user.role != 'ADMIN') return res.status(401).json({ error: 'Unauthorized' });

        const Users = users.reduce((acc, usr) => {
            acc.push({ id: usr });
            return acc;
        }, []);

        const Room = await prisma.room.update({
            where: { id: room.id },
            data: {
                name,
                fkUsers: {
                    connect: Users,
                },
                nbMaxUser
            },
            include: { fkUsers: true }
        });

        res.json(Room);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:roomId', AuthMiddleware, RoomMiddleware, async (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(401).json({ error: 'Unauthorized' });
    try {
        const room = await prisma.room.delete({
            where: { id: parseInt(req.params.roomId) },
        });
        res.json(room);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/:roomId/message', AuthMiddleware, RoomMiddleware, async (req, res) => {
    try {
        const { content, fkSenderId } = req.body;
        const message = await prisma.message.create({
            data: {
                content,
                fkSenderId,
                fkRoomId: parseInt(req.params.roomId),
            }
        });
        res.json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:roomId/messages', AuthMiddleware, RoomMiddleware, async (req, res) => {
    try {
        const messages = await prisma.message.findMany({
            where: { fkRoom: parseInt(req.params.roomId) },
            orderBy: { createdAt: 'desc' },
        });
        res.json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:roomId/messages/:messageId', AuthMiddleware, RoomMiddleware, async (req, res) => {
    try {
        const { content } = req.body;
        const message = await prisma.message.update({
            where: { id: parseInt(req.params.messageId) },
            data: {
                content
            }
        });
        if (req.user.id !== message.fkSenderId) return res.status(401).json({ error: 'Unauthorized' });
        res.json(message);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:roomId/messages/:messageId', AuthMiddleware, RoomMiddleware, AdminMiddleware, async (req, res) => {
    try {
        const message = await prisma.message.delete({
            where: { id: parseInt(req.params.messageId) },
            include: { fkSender: true }
        });
        if (req.user.id !== message.fkSenderId || req.user.role === "ADMIN")
            return res.status(401).json({ error: 'Unauthorized' });

        res.json(message);
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;


