const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users')
const {valueJoin, getAllValuesInARoom, removeValue, removeAllValuesInARoom} = require('./utils/values')
const {roomExists, roomCreate, roomPasswordCheck, getRoomName} = require('./utils/rooms')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {

  socket.on('validate', ({username, room, room_name, shouldCreateRoom, password}, callback) => {

    if(!shouldCreateRoom){
      if(roomExists(room)){
        if(roomPasswordCheck(room, password)){
          let roomName = getRoomName(room);
          let response = {"status": 200, "room_name": roomName};

          callback(response)
        }
        else{
          let response = {"status": 401}
          callback(response)
        }
      }
      else{
        let response = {"status": 404}
        callback(response)
      }
    }
    else{
      roomCreate(room, room_name, password)
      let response = {"status": 202, "room_name": room_name};
      callback(response)
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

    socket.on('newtopic', ()=> {

      const user = getCurrentUser(socket.id);

      let ans = removeAllValuesInARoom(user.room);

      console.log(ans);

      io.to(user.room).emit('clearDisplayedData', roomUsers);

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