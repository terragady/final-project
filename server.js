const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');

const socket = require('socket.io');
const io = socket(server);
// app.get('/setCookie', (req, res)=> //set cookie and redirect
//   res.redirect('')
// )
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'client/build/index.html');
});

io.on('connection', socket => {
  socket.on('New room', (roomId) => {
    socket.join(roomId);
    io.in(roomId).emit('Welcome message', 'helloooo');
  });

  socket.on('Join room', roomId => {
    socket.join(roomId);
    io.in(roomId).emit('Joined room', roomId)

  });
  

});

const port = 8080;

server.listen(port, () => console.log(`Server is running on ${port}`));