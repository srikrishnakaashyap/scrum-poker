const rooms = []

function roomExists(roomId){

  const room =  rooms.find(r => r.roomId == roomId);

  return typeof room !== 'undefined'

}

function getRoomName(roomId){

  const room =  rooms.find(r => r.roomId == roomId);

  return room.room_name;


}

function roomCreate(roomId, room_name, password){

  const room = {roomId, room_name, password};

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
  roomExists,
  getRoomName
}