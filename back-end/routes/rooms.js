const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
// const sendEmail = require('../services.js/nodemailer');
const prisma = new PrismaClient();

const router = Router();

router.get('/', async (req, res) => {
    try {
        const rooms = await prisma.room.findMany({ include: { fkUsers: true } });
        res.json(rooms);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:roomId', async (req, res) => {
    try {
        const room = await prisma.room.findUnique({ 
            where: { id: parseInt(req.params.roomId) },
            include: { fkUsers: true } 
        });

        res.json(room);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/', async (req, res) => {
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

router.put('/:roomId/join', async (req, res) => {
    try {
        const { userId } = req.body;
        const { roomId } = req.params;

        const room = await prisma.room.findUnique({ where: { id: parseInt(roomId) }, include: { fkUsers: true } });

        if (room.fkUsers.length >= room.nbMaxUser) {
            res.status(500).json({ error: 'Room is full' });
        }

        if (room.fkUsers.some(user => user.id === userId)) {
            res.status(500).json({ error: 'User already in room' });
        }

        const userRoom = await prisma.room.update({
            where: { id: parseInt(roomId) },
            data: {
                fkUsers: {
                    connect: { id: userId }
                }
            },
            include: { fkUsers: true }
        });

        res.json(userRoom);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:roomId/leave', async (req, res) => {
    try {
        const { userId } = req.body;
        const { roomId } = req.params;

        const room = await prisma.room.findUnique({ where: { id: parseInt(roomId) }, include: { fkUsers: true } });

        if (!room.fkUsers.some(user => user.id === userId)) {
            res.status(500).json({ error: 'User not in the room' });
        }

        const userRoom = await prisma.room.update({
            where: { id: parseInt(roomId) },
            data: {
                fkUsers: {
                    disconnect: { id: userId }
                }
            },
            include: { fkUsers: true }
        });

        res.json(userRoom);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:roomId', async (req, res) => {
    try {
        const { name, users, fkOrganizer, nbMaxUser } = req.body;
        const room = await prisma.room.update({
            where: { id: parseInt(req.params.roomId) },
            data: {
                name,
                fkOrganizer,
                users,
                nbMaxUser
            }
        });

        const userRoom = await prisma.userRooms.create({
            data: {
                fkRoomId: room.id,
                fkUserId: fkOrganizerId,
            }
        });

        res.json(room);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:roomId', async (req, res) => {
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

router.post('/:roomId/message', async (req, res) => {
    try {
        const { content, fkSender } = req.body;
        const message = await prisma.message.create({
            data: {
                content,
                fkSender,
                fkRoom: parseInt(req.params.roomId),
            }
        });
        res.json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:roomId/messages', async (req, res) => {
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

router.put('/:roomId/messages/:messageId', async (req, res) => {
    try {
        const { content } = req.body;
        const message = await prisma.message.update({
            where: { id: parseInt(req.params.messageId) },
            data: {
                content
            }
        });
        res.json(message);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:roomId/messages/:messageId', async (req, res) => {
    try {
        const message = await prisma.message.delete({
            where: { id: parseInt(req.params.messageId) },
        });
        res.json(message);
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;


