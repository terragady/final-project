const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path')

const socketio = require('socket.io');
const io = socketio(server);

// app.get('/setCookie', (req, res)=> //set cookie and redirect
//   res.redirect('')
// )
app.use(express.static(path.join(__dirname, 'client', 'build')));

io.on('connection', socket => {
  socket.on('create new room', roomId => {
      socket.join(roomId);
      socket.to(roomId).emit('room created', roomId)
    });
  socket.on('join existing room', roomId => {socket.join(roomId); socket.to(roomId).emit('A player has joined')});
});

const port = 8080;

server.listen(port, () => console.log(`Server is running on ${port}`));