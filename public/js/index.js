const socket = io();

function setAction(form) {
  let username = document.getElementById('username').value;
  let room_name = document.getElementById('room_name').value;
  let room = document.getElementById('room').value;
  let shouldCreateRoom = document.getElementById('shouldCreateRoom').checked;
  let password = document.getElementById('password').value;

  if(shouldCreateRoom){
    room = randomNumber();
  }

  socket.emit('validate', {username, room, room_name, shouldCreateRoom, password}, (response) => {

    if(response.status === 200){
      location.href = `main.html?username=${username}&room=${room}&room_name=${response.room_name}`
    }
    else if(response.status === 401){
      alert(401);
    }
    else if(response.status === 404){
      alert(404);
    }
    else if(response.status === 202){
      location.href = `main.html?username=${username}&room=${room}&room_name=${response.room_name}`
    }
    else{
      alert("Server Not Responding")
    }
  });
  return false;
}

function randomNumber(){

  return Date.now();
}