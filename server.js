const express = require('express');

const app = express();
const server = require('http').createServer(app);
const path = require('path');
const socketIO = require('socket.io');
const tileState = require('./tileState');

const io = socketIO(server);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}client/build/index.html`);
  });
}

// io.emit is to everyone
// socket.broadcast.emit is to everyone except sender

const state = {
  boardState: {
    players: [],
    currentPlayer: {
      id: '',
      hasMoved: false,
    },
    logs: [],
    diceValue: { dice1: ['⚅', 0], dice2: ['⚅', 0] },
    ownedProps: { 42: 'blue' },
  },
  players: {},
  turnInfo: {},
  loaded: true,
};

// player change
const nextTurn = () => {
  if (state.boardState.players.includes(state.boardState.currentPlayer.id) === -1) {
    state.boardState.currentPlayer.id = state.boardState.players[0] || 0;
  }
  const numberOfPlayers = state.boardState.players.length;
  const currentPlayerIndex = state.boardState.players.indexOf(state.boardState.currentPlayer.id);
  if (currentPlayerIndex + 1 < numberOfPlayers) {
    state.boardState.currentPlayer.id = state.boardState.players[currentPlayerIndex + 1];
  } else {
    const firstPlayer = state.boardState.players[0];
    state.boardState.currentPlayer.id = firstPlayer;
  }
};

// color array for players
const colors = ['white', 'black', 'red', 'blue', 'green', 'yellow'];
const date = () => (new Date(Date.now())).toLocaleTimeString('en-GB', { hour12: false });

// On client connection
io.on('connection', socket => {
  console.log(`${socket.id} joined`);
  socket.emit('update', state);

  // when a new player enters
  socket.on('new player', newName => {
    const { id } = socket;
    state.players[id] = {
      name: newName,
      currentTile: 0,
      color: colors.pop(),
      accountBalance: 1500,
    };
    state.boardState.logs = [
      ...state.boardState.logs,
      `${date()} - ${newName} joined the game as ${state.players[socket.id].color}`,
    ];
    state.boardState.players = Object.keys(state.players);
    io.emit('update', state);
  });

  // move when dice is rolled
  socket.on('makeMove', num => {
    const { id } = socket;
    const cTile = state.players[id].currentTile;
    if (cTile + num < 40) {
      state.players[id].currentTile = cTile + num;
    } else {
      const left = 40 - cTile;
      const more = num - left;
      state.players[id].currentTile = more;
    }
    io.emit('update', state);
  });

  // when log is submitted
  socket.on('log', logText => {
    state.boardState.logs = [...state.boardState.logs, `${date()} - ${logText}`];
    io.emit('update', state);
  });

  // next turn
  socket.on('end turn', () => {
    nextTurn();
    state.boardState.currentPlayer.hasMoved = false;
    state.turnInfo = {};
    io.emit('update', state);
  });

  // hasMoved
  socket.on('player has moved', bool => {
    state.boardState.currentPlayer.hasMoved = bool;
    const { currentTile } = state.players[socket.id];
    state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name} landed on tile nr ${currentTile}!`];
    switch (tileState[currentTile].tileType) {
      case 'normal':
        if (!Object.prototype.hasOwnProperty.call(state.boardState.ownedProps, currentTile)) {
          state.turnInfo.canBuyProp = true;
          io.emit('update', state);
        }
        break;
      default:
        break;
    }
    io.emit('update', state);
  });

  // buy property
  socket.on('buy property', () => {
    const { currentTile } = state.players[socket.id];
    state.players[socket.id].accountBalance = state.players[socket.id].accountBalance - tileState[currentTile].price;
    state.boardState.ownedProps[currentTile] = { id: socket.id, color: state.players[socket.id].color };
    state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name} bought property`];
    nextTurn();
    state.turnInfo = {};
    io.emit('update', state);
  });

  // update dice state
  socket.on('send dice', dices => {
    state.boardState.diceValue = dices;
    state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name} rolled an ${dices.dice1[1] + dices.dice2[1]}!`];
    io.emit('update', state);
  });

  // when player disconnects
  socket.on('disconnect', () => {
    if (state.players[socket.id]) {
      colors.push(state.players[socket.id].color);
      state.boardState.logs = [
        ...state.boardState.logs,
        `${date()} - ${state.players[socket.id].name} left the game`,
      ];
      delete state.players[socket.id];
    }
    state.boardState.players = Object.keys(state.players);
    if (state.boardState.players.length === 0) {
      state.boardState.logs = [];
      state.boardState.ownedProps = {};
      state.turnInfo = {};
    }
    console.log(`${socket.id} left`);
    io.emit('update', state);
  });
});

const port = 8080;

server.listen(port, () => console.log(`Server is running on ${port}`));
