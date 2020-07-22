import React, { useState, useContext, useEffect, useRef } from 'react';
import { stateContext } from '../App';

import './style/Board.css';

export default function Dice() {
  const { state, socketFunctions, playerId } = useContext(stateContext);
  let currentPlayer = 'none';

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      currentPlayer = state.boardState.currentPlayer;
    }
  }, [state]);

  function rollDice() {
    const result = Math.floor(Math.random() * 6 + 1);
    switch (result) {
      case 1:
        return ['⚀', 1];
      case 2:
        return ['⚁', 2];
      case 3:
        return ['⚂', 3];
      case 4:
        return ['⚃', 4];
      case 5:
        return ['⚄', 5];
      case 6:
        return ['⚅', 6];

      default:
        return [];
    }
  }
  const [dice, setDice] = useState({ dice1: ['☠', 0], dice2: ['🦋', 0] });

  const clickAndRoll = async () => {
    const dice1 = rollDice();
    const dice2 = rollDice();
    setDice({ dice1, dice2 });
    const result = dice1[1] + dice2[1];
    for (let i = 0; i <= result; i++) {
      setTimeout(() => {
        socketFunctions.makeMove(1);
      }, i * 200);
    }
  };
  return (
    <section className="dice">
      {currentPlayer === playerId ? <button type="button" onClick={clickAndRoll}> Roll Dice</button> : <button type="button" disabled onClick={clickAndRoll}> Roll Dice</button>}
      {currentPlayer}
      {playerId}
      <h1 className="dice__dices">
        {dice.dice1[0] + dice.dice2[0]}
      </h1>
      <h2 className="dice__result">
        {'Result: '}
        {dice.dice1[1] + dice.dice2[1]}
      </h2>
      {/* {dice.dice1[1] === dice.dice2[1] ? <h2>🤩DOUBLE🤩</h2> : ''} */}
    </section>
  );
}
