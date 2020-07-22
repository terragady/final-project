import React, {
  useEffect, useState, useReducer, createContext,
} from 'react';
import io from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import Board from './components/Board';
import Dice from './components/Dice';

const socket = io.connect('http://localhost:8080');

const initialState = { players: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case 'updateGameState':
      return { ...action.payload };
    case 'enterRoom':
      socket.emit('new player', action.payload);
      break;
    default:
      return state;
  }
};
export const stateContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  socket.on('update', newState => dispatch({ type: 'updateGameState', payload: newState }));
  return (
    <stateContext.Provider value={{ state, dispatch }}>
      <main className="App">
        <Board />
      </main>
    </stateContext.Provider>
  );
}
