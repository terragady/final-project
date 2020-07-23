import React, { useContext } from 'react';
import './style/Board.css';
import { stateContext } from '../App';

export default function Dashboard() {
  const { socketFunctions, state, playerId } = useContext(stateContext);
  return (
    <section className="center--dashboard">
      <h3>Dashboard:</h3>
      <h1>
        {state.loaded ? (
          state.boardState.currentPlayer.id,
          playerId
        )
          : 'Loading...'}
      </h1>
    </section>
  );
}
