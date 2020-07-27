import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './style/Board.css';
import { stateContext } from '../App';
import Tile from './Tile';
import initialState from './BoardInitState';
import Dice from './Dice';
import Log from './Log';
import Dashboard from './Dashboard';

function Board() {
  const [tiles] = useState(initialState);
  const { socketFunctions } = useContext(stateContext);
  const playerName = 'Default player';
  useEffect(() => {
  //   while (!playerName) playerName = prompt('What is your name?');
    socketFunctions.newPlayer(playerName);
  }, [socketFunctions, playerName]);

  return (
    <>
      <section className="Board">
        {
          tiles.map((tile, index) => {
            if (index === 0) {
              return <Tile key={uuidv4()} position="tile__start" id={index} initState={tile} />;
            }
            if (index > 0 && index <= 10) {
              return <Tile key={uuidv4()} position="tile__horizontal--bottom" id={index} initState={tile} />;
            }
            if (index >= 11 && index <= 19) {
              return <Tile key={uuidv4()} position="tile__vertical--left" id={index} initState={tile} />;
            }
            if (index >= 20 && index <= 30) {
              return <Tile key={uuidv4()} position="tile__horizontal--top" id={index} initState={tile} />;
            }
            if (index >= 31 && index <= 39) {
              return <Tile key={uuidv4()} position="tile__vertical--right" id={index} initState={tile} />;
            }
            return <></>;
          })
        }
        <section className="center">
          <Dice />
          <Log />
          <Dashboard />
        </section>

      </section>
    </>
  );
}

export default Board;
