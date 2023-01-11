const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { PrismaClient } = require('@prisma/client')
const auth = require('./routes/auth');
const rooms = require('./routes/rooms');
const cors = require('cors');

const prisma = new PrismaClient()

// async function main() {
//   const allUsers = await prisma.user.findMany()
//   console.log(allUsers)
// }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/room2', (req, res) => {
    res.sendFile(__dirname + '/room2.html');
});

// On écoute l'évènement "connection" de socket.io
io.on("connection", (socket) => {
    console.log("Une connexion s'active");

    // On écoute les déconnexions
    socket.on("disconnect", () => {
        console.log("Un utilisateur s'est déconnecté");
    });

    // On écoute les entrées dans les salles
    socket.on("enter_room", (room) => {
        // On entre dans la salle demandée
        socket.join(room);
        console.log(socket.rooms);

        // On envoie tous les messages du salon
        const messages = prisma.chat.findMany({
            select: {
                id: true,
                content: true,
                fkSender: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        role: true,
                    }
                },
                createdAt: true,
            },
            where: {
                fkRoomId: room
            }
        }).then(list => {
            socket.emit("init_messages", { messages: JSON.stringify(list) });
        }).catch(e => {
            console.log(e);
        });
    });

    // On écoute les sorties dans les salles
    socket.on("leave_room", (room) => {
        // On entre dans la salle demandée
        socket.leave(room);
        console.log(socket.rooms);
    });

    function bite({ id, name }) {
        // user.id
    }

    const user =

        bite({ id: 1, name: "prout" })

    // On gère le chat
    socket.on("chat_message", ({ message, room, token }) => {
        // socket.id -> user 
        const user = verifyToken(token)
        // fetch API -> url/rooms/:id/message
        // Header : Authorization Bearer $userToken
        // Body : content : $message
        // On stocke le message dans la base
        const Message = prisma.message.create({
            message,
            room
        }).then(() => {
            // Le message est stocké, on le relaie à tous les utilisateurs dans le salon correspondant
            io.in(room).emit("received_message", { message, room, user: user.id });
        }).catch(e => {
            console.log(e);
        });
    });

});


app.use('/auth', auth);
app.use('/rooms', rooms);
// app.use('/users', users);
app.get('/test', (req, res) => {
    res.send('Hello World!');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
// router.delete('/rooms/:id', async (req, res) => {
