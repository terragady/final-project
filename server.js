const express = require('express');

const app = express();
const server = require('http').createServer(app);
const path = require('path');
const socketIO = require('socket.io');

const io = socketIO(server);
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

const state = {
	boardState : {
		players       : [],
    currentPlayer : 1,
    logs: [],
	},
	players    : {},
	loaded     : true
};

// color array for players
const colors = [ 'white', 'black', 'red', 'blue', 'green', 'yellow' ];


// On client connection
io.on('connection', (socket) => {
	console.log(`${socket.id} joined`);
	socket.emit('update', state);


  // when a new player enters
	socket.on('new player', (newName) => {
		const { id } = socket;
		state.players[id] = {
			name        : newName,
			currentTile : 0,
			color       : colors.pop()
    };
    state.boardState.logs = [...state.boardState.logs, newName];
		state.boardState.players = Object.keys(state.players);
		io.emit('update', state);
	});

  // move when dice is rolled
	socket.on('makeMove', (num) => {
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
		console.log(state);
  });
  
    // when log is sbmitted
	socket.on('log', (logText) => {
    state.boardState.logs = [...state.boardState.logs, logText];
		io.emit('update', state);
	});

  // when player disconnects
	socket.on('disconnect', () => {
		if (state.players[socket.id]) {
			colors.push(state.players[socket.id].color);
			delete state.players[socket.id];
		}
		console.log(`${socket.id} left`);
		io.emit('update', state);
	});
});

const port = 8080;

server.listen(port, () => console.log(`Server is running on ${port}`));
