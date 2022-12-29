const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
// const sendEmail = require('../services.js/nodemailer');
const prisma = new PrismaClient();

const router = Router();

router.get('/', async (req, res) => {
    try {
        const rooms = await prisma.room.findMany();
        res.json(rooms);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:roomId', async (req, res) => {
    try {
        const room = await prisma.room.findUnique({ where: { id: parseInt(req.params.roomId) } });
        res.json(room);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, fkListUser, fkOrganizer, nbMaxUser } = req.body;
        const room = await prisma.room.create({
            data: {
                name,
                fkOrganizer,
                fkListUser,
                nbMaxUser,
            }
        });
        res.json(room);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:roomId', async (req, res) => {
    try {
        const { name, fkListUser, fkOrganizer, nbMaxUser } = req.body;
        const room = await prisma.room.update({
            where: { id: parseInt(req.params.roomId) },
            data: {
                name,
                fkOrganizer,
                fkListUser,
                nbMaxUser,
                updatedAt: new Date(),
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


