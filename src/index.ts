import express from "express";
import path from "path";
import socket from "socket.io";

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')));


const server = app.listen(app.get('port'), ()=>{
  console.log("Server on port", app.get('port'));  
});

//websockets
const io = socket(server);
io.on('connection', (socket)=> {
  console.log('new connection', socket.id);
  socket.on('chat:message', (data)=> {
    io.sockets.emit('chat:message', data);
  });

  socket.on('chat:typing',(username)=>{
    socket.broadcast.emit('chat:typing', username);
  });
});