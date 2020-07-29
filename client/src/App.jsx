import React, {
  useEffect, useReducer, useState,
} from 'react';
import io from 'socket.io-client';
import Board from './components/Board';
import stateContext from './internal';

const socket = io.connect('http://localhost:8080');
const socketFunctions = {
  makeMove: num => socket.emit('makeMove', num),
  newPlayer: name => socket.emit('new player', name),
  toggleHasMoved: bool => socket.emit('player has moved', bool),
  endTurn: () => socket.emit('end turn', ''),
  sendDice: dices => socket.emit('send dice', dices),
  inJail: dices => socket.emit('in jail', dices),
  buyProperty: () => socket.emit('buy property', true),
  sendChat: message => socket.emit('send chat', message),
};

const initialState = { boardState: {currentPlayer: {id: false}}, players: {}, loaded: false };
const reducer = (state, action) => {
  switch (action.type) {
    case 'updateGameState':
      return { ...action.payload };
    default:
      return state;
  }
};

// TODO: make into function and export it as function ??

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [playerId, setPlayerId] = useState(false);

  if (!playerId) {
    socket.on('connect', () => {
      // setPlayerId(1);
      setPlayerId(socket.id);
    });
  }
  useEffect(() => {
    socket.on('update', newState => dispatch({ type: 'updateGameState', payload: newState }));
  }, []);

  return (
    <stateContext.Provider value={{ state, socketFunctions, playerId }}>
      <main className="App">
        {/* {JSON.stringify(state)} */}
        <Board />
      </main>
    </stateContext.Provider>
  );
}
