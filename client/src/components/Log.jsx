import React, { useState, useEffect, useContext } from 'react';
import './style/Board.css';
import { stateContext } from '../App';


export default function Log() {
  const { dispatch, state } = useContext(stateContext);

  return (
    <div className="waiting-log">
      <section>
        <h3>Your lobby:</h3>
        {state
          ? state.players.map(e => (
            <p>
              {`Player ${e}`}
            </p>
          ))
          : <p>Loading...</p>}
        <section>
          <h3>Chat:</h3>

        </section>
      </section>


    </div>
  );
}
