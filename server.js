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
const colors = ['black', 'white', 'orange', 'red', 'blue', 'green', 'yellow'];

// current date function for logs
const date = () => (new Date(Date.now())).toLocaleTimeString('en-GB', { hour12: false });

// On client connection
io.on('connection', socket => {
  socket.emit('update', state);

  // when a new player enters
  socket.on('new player', newName => {
    const { id } = socket;
    state.players[id] = {
      name: newName,
      currentTile: 0,
      color: colors.pop(),
      accountBalance: 1500,
      isJail: false,
      jailRounds: 0,
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
      state.players[id].accountBalance += 200;
      state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name} has passed start and recieved $200M.`];
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
    const railRoadArray = [5, 15, 25, 35];
    const { dice1, dice2 } = state.boardState.diceValue;
    const diceResult = dice1[1] + dice2[1];

    switch (tileState[currentTile].tileType) {
      case 'normal':
        if (!Object.prototype.hasOwnProperty.call(state.boardState.ownedProps, currentTile)) {
          state.turnInfo.canBuyProp = true;
        } else if (state.boardState.ownedProps[currentTile].id !== socket.id) {
          const currentTileOwner = state.boardState.ownedProps[currentTile].id;
          state.players[socket.id].accountBalance -= tileState[currentTile].rent;
          state.players[currentTileOwner].accountBalance += tileState[currentTile].rent;
          state.boardState.logs = [
            ...state.boardState.logs, `${date()} - ${state.players[socket.id].name} have paid rent $${tileState[currentTile].rent}M to ${state.players[currentTileOwner].name}`,
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
          let ownedRailroads = 0;
          railRoadArray.forEach(tileNumb => {
            if (state.boardState.ownedProps[tileNumb]
              && state.boardState.ownedProps[tileNumb].id
              === state.boardState.ownedProps[currentTile].id) {
              ownedRailroads += 1;
            }
          });
          const priceToPay = 25 * 2 ** (ownedRailroads - 1);
          state.players[socket.id].accountBalance -= priceToPay;
          state.players[state.boardState.ownedProps[currentTile].id].accountBalance += priceToPay;
          if (ownedRailroads > 1) {
            state.boardState.logs = [
              ...state.boardState.logs, `${date()} - ${state.players[socket.id].name} have paid rent $${priceToPay}M for ${ownedRailroads} owned railroads to ${state.players[state.boardState.ownedProps[currentTile].id].name}`,
            ];
          } else {
            state.boardState.logs = [
              ...state.boardState.logs, `${date()} - ${state.players[socket.id].name} have paid rent $${priceToPay}M to ${state.players[state.boardState.ownedProps[currentTile].id].name}`,
            ];
          }
          nextTurn();
        }
        break;
      }
      case 'gojail':
        state.players[socket.id].isJail = true;
        state.players[socket.id].jailRounds = 0;
        state.players[socket.id].currentTile = 10;
        state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name} was sent to jail for tax fraud.`];
        nextTurn();
        break;
      case 'jail':
        state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name}, no worries, just visiting!`];
        nextTurn();
        break;
      case 'company': {
        if (!Object.prototype.hasOwnProperty.call(state.boardState.ownedProps, currentTile)) {
          state.turnInfo.canBuyProp = true;
        } else {
          let priceToPay = 0;
          if (state.boardState.ownedProps[12]
            && state.boardState.ownedProps[28]
            && state.boardState.ownedProps[12].id === state.boardState.ownedProps[currentTile].id
            && state.boardState.ownedProps[28].id === state.boardState.ownedProps[currentTile].id) {
            priceToPay = diceResult * 10;
          } else { priceToPay = diceResult * 4; }
          state.players[socket.id].accountBalance -= priceToPay;
          state.players[state.boardState.ownedProps[currentTile].id].accountBalance += priceToPay;
          state.boardState.logs = [
            ...state.boardState.logs, `${date()} - ${state.players[socket.id].name} have paid rent $${priceToPay}M to ${state.players[state.boardState.ownedProps[currentTile].id].name}`,
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
    state.boardState.ownedProps[currentTile] = {
      id: socket.id,
      color: state.players[socket.id].color,
    };
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
    io.emit('update', state);
  });

  socket.on('in jail', dices => {
    const { jailRounds } = state.players[socket.id];
    const { currentTile } = state.players[socket.id];
    const diceResult = dices.dice1[1] + dices.dice2[1];
    if (jailRounds === 2) {
      state.players[socket.id].currentTile = currentTile + diceResult;
      state.players[socket.id].isJail = false;
      state.players[socket.id].jailRounds = 0;
      state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name} waited patiently and got out of jail.`];
    } else if (dices.dice1[1] === dices.dice2[1]) {
      state.players[socket.id].currentTile = currentTile + diceResult;
      state.players[socket.id].isJail = false;
      state.players[socket.id].jailRounds = 0;
      state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name} got lucky and escaped jail.`];
    } else {
      state.players[socket.id].jailRounds += 1;
      state.boardState.logs = [...state.boardState.logs, `${date()} - ${state.players[socket.id].name} has to stay in jail.`];
    }
    nextTurn();
    io.emit('update', state);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
