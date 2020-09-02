import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './style/Board.css';
import Tile from './Tile.jsx';
import initialState from './BoardInitState';
import Center from './Center';
import Dice from './Dice';


function Board() {
  const [tiles, setTiles] = useState(initialState);
  return (
    <>
      <section className="Board">
        {
      tiles.map((tile, index) => {
        if (index === 0) {
          return <Tile key={uuidv4()} position="tile--start" id={index} initState={tile} />;
        }
        if (index > 0 && index <= 10) {
          return <Tile key={uuidv4()} position="horizontal--bottom" id={index} initState={tile} />;
        }
        if (index >= 11 && index <= 19) {
          return <Tile key={uuidv4()} position="vertical--left" id={index} initState={tile} />;
        }
        if (index >= 20 && index <= 30) {
          return <Tile key={uuidv4()} position="horizontal--top" id={index} initState={tile} />;
        }
        if (index >= 31 && index <= 39) {
          return <Tile key={uuidv4()} position="vertical--right" id={index} initState={tile} />;
        }
      })
    }
        <div className="center">
          Hello there
          <br />
          {' '}
          <Dice />
        </div>
      </section>
    </>
  );
}

export default Board;
