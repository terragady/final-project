const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const socket = require('socket.io');
const io = socket(server);
// app.get('/setCookie', (req, res)=> //set cookie and redirect
//   res.redirect('')
// )

const boardInitState = require('./client/src/components/BoardInitState');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}client/build/index.html`);
  });
}
// io.emit is to everyone
// socket.broadcast.emit is to everyone except sender
let state = { boardState: boardInitState, players: ['marcin'] };
io.on('connection', socket => {
  socket.emit('update', state);

  socket.on('new player', newName => {
    state = { ...state, players: [...state.players, newName] };
    io.emit('update', state);
  });

  socket.on('disconnect', () => console.log('left'));
});

const port = 8080;

server.listen(port, () => console.log(`Server is running on ${port}`));
