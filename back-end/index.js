const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { PrismaClient } = require('@prisma/client')
const auth = require('./routes/auth');
const rooms = require('./routes/rooms');

const prisma = new PrismaClient()

// async function main() {
//   const allUsers = await prisma.user.findMany()
//   console.log(allUsers)
// }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(`user connected ${socket.id}`);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('join_room', (data) => {
    const { room, user } = data;
    console.log(data);
    socket.join(data.room);

    socket.to(room).emit('user_joined', user);
  });
  // socket.on('send_message', (data) => {
  //   io.to(data.room).emit('receive_message', data);
  //   const createMsg = await prisma.message.create({
  //     data: {
  //       content: data.content,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       fkSender: {
  //         connect: { id: data.user.id },
  //       fkrRoom: {
  //         connect: { id: data.room.id },
  //       },
  //     },
  //   }});
  socket.on('leave_room', (data) => {
    socket.leave(data.room);
    io.to(data.room).emit('user_left', data);
  }
  );
  socket.on('typing', (data) => {
    socket.broadcast.to(data.room).emit('typing', data);
  });

});

app.use('/auth', auth);
app.use('/rooms', rooms);
// app.use('/users', require('./routes/users'));
// app.use('/posts', require('./routes/posts'));
// app.use('/profile', require('./routes/profile'));
app.get('/test', (req, res) => {
  res.send('Hello World!');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
// router.delete('/rooms/:id', async (req, res) => {
