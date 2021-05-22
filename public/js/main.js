const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

window.addEventListener('load', function () {

  const roomName = document.getElementById("room-name");

  roomName.innerHTML = room;

  socket.emit('joinRoom', {username, room})

  socket.emit('getUserList');
  
})


const socket = io();

socket.on('getAllValues', (values) => {

  var x = document.getElementById("myTable").tHead.innerHTML;
  


  let count = 0;
  removeAllChildNodes(x);

  // Display Selected Values
  Object.entries(values).forEach(item => {

    var row = document.createElement("TR");
    row.setAttribute("id", `myTr${count}`);
    document.getElementById("myTable").appendChild(row);

    var userCol = document.createElement("TD");
    var userVal = document.createTextNode(item[1].username);
    var valueCol = document.createElement("TD");
    var valueVal = document.createTextNode(item[1].selectedValue);
    userCol.appendChild(userVal);
    valueCol.appendChild(valueVal);

    document.getElementById(`myTr${count}`).appendChild(userCol);
    document.getElementById(`myTr${count}`).appendChild(valueCol);
    count = count + 1;
	
  })

})

socket.on('userListRequest', (response) => {

  populateUsers(response);

});

socket.on('message', message => {

  console.log(message);
});

socket.on('userChange', ({userName, type, roomUsers}) => {

  populateUsers(userName, type, roomUsers);
});


function clicked(button){
  button = button.toString();
  socket.emit('selected', {username, room, button});
}

function display(){

  const displayButton = document.getElementById('display');

  displayButton.disabled = true;

  for(var i = 1; i <= 7; i++){
    let numbersButtons = document.getElementById(`${i}`);
    numbersButtons.disabled = true;
  }


  socket.emit('display', room);
}

function newTopic(){

  const displayButton = document.getElementById('display');

  displayButton.disabled = false;

  for(var i = 1; i <= 7; i++){
    let numbersButtons = document.getElementById(`${i}`);
    numbersButtons.disabled = false;
  }
}


function populateUsers(userName, type, roomUsers){

  if(typeof userName === 'undefined'){
    console.log(userName);
  }
  else{
    userList = document.getElementById("users");

    Object.entries(roomUsers).forEach(item => { 

      var userRow = document.createElement("li");
      userRow.appendChild(document.createTextNode(item[1].username));

      userList.appendChild(userRow);
    });

    console.log(userList);
    
  }
}

function populateUsers(roomUsers){

  userList = document.getElementById("users");

  removeAllChildNodes(userList)

  Object.entries(roomUsers).forEach(item => { 

    var userRow = document.createElement("li");
    userRow.appendChild(document.createTextNode(item[1].username));

    userList.appendChild(userRow);
  });

  console.log(userList);
    
  
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}