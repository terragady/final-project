import React, { useState, useEffect, useContext } from 'react';
import './style/Board.css';
import { stateContext } from '../App';

export default function Dashboard() {
  const { state, socketFunctions } = useContext(stateContext);
  return (
    <section className="center--dashboard">
      <h3>Dashboard:</h3>
      <button type="button" onClick={() => {
        socketFunctions.makeMove(1)
        // dispatch({ type: 'makeMove', payload: 1 });
        console.log('stuff')
        }
        }>
        move by 1
      </button>
    </section>
  );
}
