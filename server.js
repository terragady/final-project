const express = require('express');

const app = express();
const server = require('http').createServer(app);
const path = require('path');

const socket = require('socket.io');

const io = socket(server);
// app.get('/setCookie', (req, res)=> //set cookie and redirect
//   res.redirect('')
// )
if (process.env.NODE_ENV = 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}client/build/index.html`);
  });
}
// io.emit is to everyone
// socket.broadcast.emit is to everyone except sender
const state = { inGame: 'false', players: ['marcin'] };
io.on('connection', socket => {
  socket.emit('update', state);
  socket.on('update', newName => {
    state.players.push(newName);
    socket.emit('update', state);
  });

  socket.on('disconnect', () => console.log('left'));
});

const port = 8080;

server.listen(port, () => console.log(`Server is running on ${port}`));
