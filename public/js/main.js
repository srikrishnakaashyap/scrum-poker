
const chatMessages = document.querySelector('.chat-messages');

const chatForm = document.getElementById('chat-form');

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

console.log(username);
const socket = io();

socket.emit('joinRoom', {username, room});

socket.on('getAllValues', (values) => {

  var x = document.createElement("TABLE");
  x.setAttribute("id", "myTable");
  document.body.appendChild(x);


  let count = 0;
  Object.entries(values).forEach(item => {

    var row = document.createElement("TR");
    console.log(row);
    row.setAttribute("id", `myTr${count}`);
    document.getElementById("myTable").appendChild(row);

    var userCol = document.createElement("TD");
    var userVal = document.createTextNode(item[0]);
    var valueCol = document.createElement("TD");
    var valueVal = document.createTextNode(item[1]);
    userCol.appendChild(userVal);
    valueCol.appendChild(valueVal);

    document.getElementById(`myTr${count}`).appendChild(userCol);
    console.log(row);
    document.getElementById(`myTr${count}`).appendChild(valueCol);
    count = count + 1;
  })

})

socket.on('message', message => {
  console.log(message);
});


function clicked(button){
  button = button.toString();
  socket.emit('selected', {username, room, button});
}

function display(){

  socket.emit('display', room);
}