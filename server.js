const app = require('express')();
const server = require('http').createServer(app);

const socketio = require('socket.io');
const io = socketio(server);

// app.get('/setCookie', (req, res)=> //set cookie and redirect
//   res.redirect('')
// )

io.on('connection', socket => {
  socket.emit('message', 'Welcome');
  socket.broadcast.emit('message', 'A player has joined the game');

  socket.on('create new room', roomId => );
  
  // Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A player has left the game');
  });
})

const port = 8080;

server.listen(port, () => console.log(`Server is running on ${port}`));