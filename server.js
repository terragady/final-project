const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const socket = require('socket.io');
const io = socket(server);
// app.get('/setCookie', (req, res)=> //set cookie and redirect
//   res.redirect('')
// )

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}client/build/index.html`);
  });
}
// io.emit is to everyone
// socket.broadcast.emit is to everyone except sender
let state = { boardState: null, players: {} };
const colors = ['white', 'black', 'red', 'blue', 'green', 'yellow'];
io.on('connection', socket => {
  console.log(socket.id + ' joined');
  socket.emit('update', state);

  socket.on('new player', newName => {
    const { id } = socket;
    state.players[id] = {
      name: newName,
      currentTile: 0,
      color: colors.pop(),
    };
    console.log(state);
    console.log(colors);
    io.emit('update', state);
  });

  socket.on('disconnect', () => {
    if (state.players[socket.id]) {
      colors.push(state.players[socket.id].color);
      delete state.players[socket.id];
    }
    console.log(colors);
    console.log(socket.id + ' left');
    io.emit('update', state);
  });
});

const port = 8080;

server.listen(port, () => console.log(`Server is running on ${port}`));
