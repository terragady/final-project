import React, { useContext } from 'react';
import './style/Board.css';
import { stateContext } from '../App';

export default function Log() {
  const { state } = useContext(stateContext);

  return (
    <div className="waiting-room">
      <section className="waiting-log">
        <h3>Log:</h3>

        {state
          ? Object.keys(state.players).map(e => (
            <p style={{ color: state.players[e].color }}>
              {`${state.players[e].name} joined as "${state.players[e].color}"`}
            </p>
          ))
          : <p>Loading...</p>}

      </section>
      <section className="waiting-log__game">
        <h3>Log:</h3>

      </section>
    </div>
  );
}
