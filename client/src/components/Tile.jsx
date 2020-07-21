import React from 'react';
import './style/Board.css';

function Tile({ initState, id, position }) {
  return (
    <article className={`Tile tile${id} ${position}`}>
      {initState.color === 'lightblue'
        || initState.color === 'red'
        || initState.color === 'yellow'
        || initState.color === 'green'
        || initState.color === 'blue'
        || initState.color === 'brown'
        || initState.color === 'pink'
        || initState.color === 'orange'
        ? (
          <>
            <div
              className="color-box"
              style={initState.color
                ? { backgroundColor: initState.color }
                : { color: 'black' }}
            />
            <div>
              <p className="tile--street-name">{initState.streetName}</p>
              <p className="tile--price">{`$${initState.price}M`}</p>
            </div>
          </>
        )
        : <p className="tile--special-name">{initState.streetName}</p>}
    </article>
  );
}

export default Tile;
