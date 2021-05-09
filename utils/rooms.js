const rooms = []

function roomExists(roomId){

  const room =  rooms.find(r => r.roomId == roomId);

  return typeof room !== 'undefined'

}

function roomCreate(roomId, password){

  const room = {roomId, password};

  rooms.push(room);
  console.log(rooms);

  return room;

}

function roomPasswordCheck(roomId, password){

  const room =  rooms.find(r => r.roomId == roomId);

  if(room != -1 && room.password == password){

    return true;

  }
  return false;
}

module.exports = {
  roomPasswordCheck,
  roomCreate,
  roomExists
}