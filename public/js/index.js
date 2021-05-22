const socket = io();

function setAction(form) {
  let username = document.getElementById('username').value;
  let room = document.getElementById('room').value;
  let shouldCreateRoom = document.getElementById('shouldCreateRoom').checked;
  let password = document.getElementById('password').value;

  if(shouldCreateRoom){
    room = randomNumber();
  }

  socket.emit('validate', {username, room, shouldCreateRoom, password}, (response) => {

    if(response === 200){
      location.href = `main.html?username=${username}&room=${room}`
    }
    else if(response === 401){
      alert(401);
    }
    else if(response === 404){
      alert(404);
    }
    else if(response === 202){
      location.href = `main.html?username=${username}&room=${room}`
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