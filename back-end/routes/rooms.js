const {Router} = require('express') ;
const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;
const {PrismaClient} = require('@prisma/client') ;
const sendEmail = require('../services.js/nodemailer');
const prisma = new PrismaClient() ; 

const router = Router() ;

router.get('/rooms', async (req, res) => {
    try {
        const rooms = await prisma.room.findMany() ;
        res.json(rooms) ;

    } catch (error) {
        console.log(error) ;
        res.status(500).json({error: 'Something went wrong'}) ;
    }
});

router.get('/rooms/:id', async (req, res) => {
    try {
        const room = await prisma.room.findUnique({where: {id: parseInt(req.params.id)}}) ;
        res.json(room) ;
    } catch (error) {
        console.log(error) ;
        res.status(500).json({error: 'Something went wrong'}) ;
    }
});

router.post('/rooms', async (req, res) => {
    try {
        const {name, description, type} = req.body ;
        const room = await prisma.room.create({
            data: {
                name,
                description,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        }) ;
        res.json(room) ;
    } catch (error) {
        console.log(error) ;
        res.status(500).json({error: 'Something went wrong'}) ;
    }
});

router.put('/rooms/:id', async (req, res) => {
    try {
        const {name, description} = req.body ;
        const room = await prisma.room.update({
            where: {id: parseInt(req.params.id)},
            data: {
                name,
                description,
                updatedAt: new Date(),
            }
        }) ;
        res.json(room) ;
    } catch (error) {
        console.log(error) ;
        res.status(500).json({error: 'Something went wrong'}) ;
    }
});

router.delete('/rooms/:id', async (req, res) => {
    try {
        const room = await prisma.room.delete({
            where: {id: parseInt(req.params.id)},
        }) ;
        res.json(room) ;
    } catch (error) {
        console.log(error) ;
        res.status(500).json({error: 'Something went wrong'}) ;
    }
});

router.post('/rooms/:id/messages', async (req, res) => {
    try {
        const {content} = req.body ;
        const message = await prisma.message.create({
            data: {
                content,
                createdAt: new Date(),
                updatedAt: new Date(),
                roomId: parseInt(req.params.id),
                userId: req.params.userId,
            }
        }) ;
        res.json(message) ;
    } catch (error) {
        console.log(error) ;
        res.status(500).json({error: 'Something went wrong'}) ;
    }
});

router.get('/rooms/:id/messages', async (req, res) => {
    try {
        const messages = await prisma.message.findMany({
            where: {roomId: parseInt(req.params.id)},
            orderBy: {createdAt: 'desc'},
        }) ;
        res.json(messages) ;
    } catch (error) {
        console.log(error) ;
        res.status(500).json({error: 'Something went wrong'}) ;
    }
});

router.put('/rooms/:id/messages/:messageId', async (req, res) => {
    try {
        const {content} = req.body ;
        const message = await prisma.message.update({
            where: {id: parseInt(req.params.messageId)},
            data: {
                content,
                updatedAt: new Date(),
            }
        }) ;
        res.json(message) ;

    } catch (error) {
        console.log(error) ;
        res.status(500).json({error: 'Something went wrong'}) ;
    }
});

router.delete('/rooms/:id/messages/:messageId', async (req, res) => {
    try {
        const message = await prisma.message.delete({
            where: {id: parseInt(req.params.messageId)},
        }) ;
        res.json(message) ;
    } catch (error) {
        console.log(error) ;

        res.status(500).json({error: 'Something went wrong'}) ;
    }
});

module.exports = router ;


