const express = require('express');

const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

var map = new Map()

// [{"username": value}]

io.on('connection', socket => {
  socket.emit('message', 'Welcome');
  socket.broadcast.emit('message', 'A user has joined the chat');

  // io.emit();
  socket.on('disconnect', () => {

    io.emit('message', 'A user has left the chat');
  })

  socket.on('selected', (msg) => {

    map[msg.userName] = msg.value;
    console.log(map);

  });

  socket.on('display', () => {
    io.emit('map', map);
    map = new Map();
  });



})


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {

  console.log(`SERVER STARTED on port ${PORT}`);

});