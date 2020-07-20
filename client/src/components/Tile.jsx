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
            <p>{initState.streetName}</p>
            <p>{`$${initState.price}M`}</p>
          </>
        )
        : (
          <>
            <p>{initState.streetName}</p>
            {initState.price ? <p className="tile--price">{`$${initState.price}M`}</p> : <></>}
          </>
        )}
    </article>
  );
}

export default Tile;
