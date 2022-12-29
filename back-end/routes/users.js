const {Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
// const sendEmail = require('../services.js/nodemailer');
const prisma = new PrismaClient();

const router = Router();

router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);

    }   
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.userId) } });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;
        const user = await prisma.user.create({
            data: {
                email,
                password,
                firstname,
                lastname,
            }
        });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.put('/:userId', async (req, res) => {
    try {
        const { email, password, firstname, lastname, role } = req.body;
        const user = await prisma.user.update({
            where: { id: parseInt(req.params.userId) },
            data: {
                email,
                password,
                firstname,
                lastname,
                role,
            }
        });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const user = await prisma.user.delete({ where: { id: parseInt(req.params.userId) } });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
