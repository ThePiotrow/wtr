const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const sendEmail = require('../services/nodemailer');

const prisma = new PrismaClient();
const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }
    } else {
        res.status(401).json({ error: 'Invalid email' });
    }
});

router.post('/register', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
        res.status(409).json({ error: 'Email already exists' });
    } else {
        const hash = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hash,
                firstName: firstName,
                lastName: lastName,
                role: 'USER',
            }
        });
        const token = jwt.sign({ id: newUser.id, email: email }, process.env.JWT_SECRET);

        let mail = sendEmail(email,
            'Confirmez votre adresse email',
            `Salut ${firstName.charAt(0).toUpperCase() + firstName.slice(1)}, <br> Pour activer ton compte clique sur le lien : <br> <a href="http://localhost:3000/confirm?token=${token}">http://localhost:3000/confirm?token=${token}</a>`);

        res.json({ token });
    }
});

router.get('/verify', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id, confirmed: true } });
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

router.patch('/confirm', async (req, res) => {
    const { token } = req.query;
    try {
        const { id, email } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.update({ where: { id, email }, data: { confirmed: true } });
        if (user) {
            res.json(user);
            // sendEmail(user.email, 'Welcome to the app', 'Thank you for confirming your email') ;
        } else {
            res.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

router.patch('/reset-password', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const { password } = req.body;
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const hash = await bcrypt.hash(password, 10);
        const user = await prisma.user.update({ where: { id }, data: { password: hash } });
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        // sendEmail(email,
        //     'Reset your password',
        //     'Please click on the following link to reset your password: http://localhost:3000/reset-password?token='
        //     + token) ;
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid email' });
    }
});





module.exports = router;