import React, {
  useEffect, useState, useReducer, createContext,
} from 'react';
import io from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import Board from './components/Board';
import Dice from './components/Dice';

const socket = io.connect('http://localhost:8080');

const initialState = { players: ['aa'] };
const reducer = (state, action) => {
  switch (action.type) {
    case 'updateGameState':
      return { ...action.payload };
    case 'enterRoom':
      socket.emit('update', action.payload);
      break;
    default:
      return state;
  }
};
export const stateContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  socket.on('update', newState => dispatch({ type: 'updateGameState', payload: newState }));
  socket.on('disc', x => console.log(x));
  return (
    <stateContext.Provider value={{ state, dispatch }}>
      <main className="App">
        <p>{state ? JSON.stringify(state) : 'Loading...'}</p>
        <Board />
      </main>
    </stateContext.Provider>
  );
}
