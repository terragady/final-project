import React, {
  useEffect, useReducer, createContext,
} from 'react';
import io from 'socket.io-client';
import Board from './components/Board';

const socket = io.connect('http://localhost:8080');
const socketFunctions = {
  makeMove: num => socket.emit('makeMove', num),
  newPlayer: name => socket.emit('new player', name),
};

const initialState = { players: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case 'updateGameState':
      return { ...action.payload };
    default:
      return state;
  }
};
export const stateContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    socket.on('update', newState => dispatch({ type: 'updateGameState', payload: newState }));
  }, []);
  return (
    <stateContext.Provider value={{ state, socketFunctions }}>
      <main className="App">
        <Board />
      </main>
    </stateContext.Provider>
  );
}
