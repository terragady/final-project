import React from 'react';
import './style/Board.css';

export default function Dice() {
  function rollDice() {
    const result = Math.floor(Math.random() * 6 + 1);
    switch (result) {
      case 1:
        return ['⚀', 1];
        break;
      case 2:
        return ['⚁', 2];
        break;
      case 3:
        return ['⚂', 3];
        break;
      case 4:
        return ['⚃', 4];
        break;
      case 5:
        return ['⚄', 5];
        break;
      case 6:
        return ['⚅', 6];
        break;

      default:
        break;
    }
  }
  const [diceFont1, diceNumber1] = rollDice();
  const [diceFont2, diceNumber2] = rollDice();

  return (
    <section className="dice">
      <h1 className="dice__dices">
        {diceFont1 + diceFont2}
      </h1>
      <h2 className="dice__result">
        {'Result: '}
        {diceNumber1 + diceNumber2}
      </h2>
      {diceNumber1 === diceNumber2 ? <h2>🤩DOUBLE🤩</h2> : ''}
    </section>
  );
}
