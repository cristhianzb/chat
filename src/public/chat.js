console.log("chating");
const socket = io();

const message = document.getElementById('message');
const username = document.getElementById('username');
const btnSend = document.getElementById('send');
const output = document.getElementsByClassName('output').item(0);
const actions = document.getElementsByClassName('actions').item(0);

btnSend.addEventListener('click', () => {
  socket.emit('chat:message', {
    username: username.value,
    message: message.value
  });
});

message.addEventListener('keypress',()=> {
  socket.emit('chat:typing', username.value);
});

socket.on('chat:message',({username, message})=> {
  actions.innerHTML = '';
  output.innerHTML += 
  `<p>
    <strong>${username}</strong>: ${message}
  </p>`;
});

socket.on('chat:typing', (username)=>{
  actions.innerHTML =
  `<p><em>${username}</em> is typing...</p>`;
});