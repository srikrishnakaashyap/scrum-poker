const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users')
const {valueJoin, getAllValuesInARoom, removeValue} = require('./utils/values')
const {roomExists, roomCreate, roomPasswordCheck} = require('./utils/rooms')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {

  socket.on('validate', ({username, room, shouldCreateRoom, password}, callback) => {

    if(!shouldCreateRoom){
      if(roomExists(room)){
        if(roomPasswordCheck(room, password)){
          callback(200)
        }
        else{
          callback(401)
        }
      }
      else{
        callback(404)
      }
    }
    else{
      roomCreate(room, password)
      callback(202)
    }
  })

  socket.on('joinRoom', ({username, room}) => {

    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    socket.emit('message', 'Welcome to Scrum Poker');

    const roomUsers = getRoomUsers(user.room);
    const type = 1;
    const userName = user.username;
    socket.broadcast.to(user.room).emit('userChange', {userName, type, roomUsers});
  
    socket.on('selected', ({username, room, button}) => {

      console.log(button);

      const value = valueJoin(socket.id, username, room, button)
    });
  
    socket.on('display', (room) => {
      const users = getAllValuesInARoom(room);
      io.to(user.room).emit('getAllValues', users);
    });

    socket.on('getUserList', () => {
      const user = getCurrentUser(socket.id)
      const roomUsers = getRoomUsers(user.room);
      io.to(user.room).emit('userListRequest', roomUsers);
    });
  });


  socket.on('disconnect', () => {

    const user = userLeave(socket.id);
    if(user){
      const value = removeValue(socket.id);
      const roomUsers = getRoomUsers(user.room);
      const type = 0;
      const userName = user.username
      io.to(user.room).emit('userChange', {userName, type, roomUsers});
    }
  })
})


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {

  console.log(`SERVER STARTED on port ${PORT}`);

});