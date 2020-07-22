import React, { useContext } from 'react';
import './style/Board.css';
import { stateContext } from '../App';

function Tile({ initState, id, position }) {
  const { state } = useContext(stateContext);
  return (
    <article className={`Tile tile${id} ${position}`} id={id}>
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
              <div className="token-wrapper">
                {Object.keys(state.players).map(e => (
                  state.players[e].currentTile === id
                    ? <div className="player-token" style={{ backgroundColor: state.players[e].color }} />
                    : <></>
                ))}
              </div>
              <p className="tile--price">{`$${initState.price}M`}</p>
            </div>
          </>
        )
        : (
          <>
            <p className="tile--special-name">{initState.streetName}</p>
            <div className="token-wrapper">
              {Object.keys(state.players).map(e => (
                state.players[e].currentTile === id
                  ? <div className="player-token" style={{ backgroundColor: state.players[e].color }} />
                  : <></>
              ))}
            </div>
          </>
        )
      }
    </article>
  );
}

export default Tile;
