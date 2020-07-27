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

  // send chat
  socket.on('send chat', message => {
    state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name} says: ${message}`];
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
    // const { accountBalance } = state.players[socket.id];
    // state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name} landed on tile nr ${currentTile}!`];
    switch (tileState[currentTile].tileType) {
      case 'normal':
        if (!Object.prototype.hasOwnProperty.call(state.boardState.ownedProps, currentTile)) {
          state.turnInfo.canBuyProp = true;
        } else if (state.boardState.ownedProps[currentTile].id !== socket.id) {
          state.players[socket.id].accountBalance -= tileState[currentTile].rent;
          state.players[state.boardState.ownedProps[currentTile].id].accountBalance += tileState[currentTile].rent
          state.boardState.logs = [
            ...state.boardState.logs, `${date()} - ${state.players[socket.id].name} have paid rent $${tileState[currentTile].rent}M to ${state.players[state.boardState.ownedProps[currentTile].id].name}`
          ];
          nextTurn();
        } else {
          nextTurn();
        }
        break;
      case 'expense':
        state.players[socket.id].accountBalance -= tileState[currentTile].rent;
        state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name} paid ${tileState[currentTile].rent} in taxes.`];
        nextTurn();
        break;
      case 'railroad': {
        if (!Object.prototype.hasOwnProperty.call(state.boardState.ownedProps, currentTile)) {
          state.turnInfo.canBuyProp = true;
        } else {
          const railRoadArray = [5, 15, 25, 35];
          const tileOwner = state.boardState.ownedProps[currentTile].id;
          let ownedRailroads = 0;
           railRoadArray.forEach(tileNumb => {
            if (state.boardState.ownedProps[tileNumb] && state.boardState.ownedProps[tileNumb].id === tileOwner) {
              ownedRailroads += 1
            }
          });
          const priceToPay = 25 * 2 ** (ownedRailroads - 1)
          state.players[socket.id].accountBalance -= priceToPay;
          state.players[state.boardState.ownedProps[currentTile].id].accountBalance += priceToPay;
          if (ownedRailroads > 1) {
            state.boardState.logs = [
              ...state.boardState.logs, `${date()} - ${state.players[socket.id].name} have paid rent $${priceToPay}M for ${ownedRailroads} owned railroads to ${state.players[state.boardState.ownedProps[currentTile].id].name}`
            ];
          } else {
          state.boardState.logs = [
            ...state.boardState.logs, `${date()} - ${state.players[socket.id].name} have paid rent $${priceToPay}M to ${state.players[state.boardState.ownedProps[currentTile].id].name}`
          ];}
          nextTurn();
        }
        break;
      }
      case 'company': {
        if (!Object.prototype.hasOwnProperty.call(state.boardState.ownedProps, currentTile)) {
          state.turnInfo.canBuyProp = true;
        } else {
          const diceResult = state.boardState.diceValue.dice1[1] + state.boardState.diceValue.dice2[1];
          const tileOwner = state.boardState.ownedProps[currentTile].id;
          let priceToPay = 0;
          if (state.boardState.ownedProps[12] && state.boardState.ownedProps[28] && state.boardState.ownedProps[12].id === tileOwner && state.boardState.ownedProps[28].id === tileOwner) {
            priceToPay = diceResult * 10
          } else { priceTopay =  diceResult *4}
          state.players[socket.id].accountBalance -= priceToPay;
          state.players[state.boardState.ownedProps[currentTile].id].accountBalance += priceToPay;
          state.boardState.logs = [
            ...state.boardState.logs, `${date()} - ${state.players[socket.id].name} have paid rent $${priceToPay}M to ${state.players[state.boardState.ownedProps[currentTile].id].name}`
          ];
          nextTurn();
        }
        break;
      }
      default:
        nextTurn();
        break;
    }
    io.emit('update', state);
  });

  // buy property
  socket.on('buy property', () => {
    const { accountBalance } = state.players[socket.id];
    const { currentTile } = state.players[socket.id];
    state.players[socket.id].accountBalance = accountBalance - tileState[currentTile].price;
    // eslint-disable-next-line
    state.boardState.ownedProps[currentTile] = { id: socket.id, color: state.players[socket.id].color };
    state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name} bought property`];
    nextTurn();
    state.turnInfo = {};
    io.emit('update', state);
  });

  // update dice state
  socket.on('send dice', dices => {
    state.boardState.diceValue = dices;
    state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name} rolled ${dices.dice1[1] + dices.dice2[1]}!`];
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

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));