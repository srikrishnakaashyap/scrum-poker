const socket = io();
const chatMessages = document.querySelector('.chat-messages');

const chatForm = document.getElementById('chat-form');


socket.on('map', map => {

  console.log(map);

  var x = document.createElement("TABLE");
  x.setAttribute("id", "myTable");
  document.body.appendChild(x);


  let count = 0;
  Object.entries(map).forEach(item => {

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



  // mp.forEach((values,keys)=>{

    // const div = document.createElement('div');

    // div.classList.add('message');
    // div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    // <p class="text">
    //   ${values} : ${keys}
    // </p>`;
  //   document.querySelector('.demo').appendChild(div)
  // })


})

socket.on('message', message => {

  // outputMessage(message);
  console.log(message);
  // document.getElementById("demo").innerHTML = message;

  // chatMessages.scrollTop = chatMessages.scrollHeight;
});

// socket.on('message', message => {

//   outputMessage(message);

//   chatMessages.scrollTop = chatMessages.scrollHeight;
// });


// chatForm.addEventListener('submit', (e) => {

//   e.preventDefault();

//   const msg = e.target.elements.msg.value;

//   socket.emit('chatMessage', msg);

//   e.target.elements.msg.value = '';
//   e.target.elements.msg.focus();

// })


// function outputMessage(message){
//   const div = document.createElement('div');

//   div.classList.add('message');
//   div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
//   <p class="text">
//     ${message}
//   </p>`;

//   document.querySelector('.chat-messages').appendChild(div);



// }

function clicked(button){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userName = urlParams.get('username').toString();
  const data = {"userName": userName, "value": button};
  socket.emit('selected', data);
  // document.getElementById("demo").innerHTML = button;
}

function display(){

  socket.emit('display', '');
}