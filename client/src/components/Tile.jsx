import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import './style/Board.css';
import { stateContext } from '../App';

function Tile({ initState, id, position }) {
  const { state } = useContext(stateContext);
  return (
    <article className={`Tile tile${id} ${position}`} id={id}>
      {initState.color && initState.color !== 'railroad'
        ? (
          <>
            <div
              className="color-box"
              style={
                state.loaded
                && Object.prototype.hasOwnProperty.call(state.boardState.ownedProps, id)
                  ? { backgroundColor: initState.color, boxShadow: `0px 0px 10px 10px ${state.boardState.ownedProps[id].color}` }
                  : { backgroundColor: initState.color }
              }
            />
            <div className="tile--wrapper">
              <p className="tile--street-name">{initState.streetName}</p>
              <div className="token-wrapper">
                {Object.keys(state.players).map(e => (
                  state.players[e].currentTile === id
                    ? <div key={uuid()} className="player-token" style={{ backgroundColor: state.players[e].color }} />
                    : <div key={uuid()} />
                ))}
              </div>
              <p className="tile--price">{`$${initState.price}M`}</p>
            </div>
          </>
        )
        : (
          <div className="tile--wrapper">
            <p className="tile--special-name">{initState.streetName}</p>
            <div className="token-wrapper">
              {Object.keys(state.players).map(e => (
                state.players[e].currentTile === id
                  ? <div key={uuid()} className="player-token" style={{ backgroundColor: state.players[e].color }} />
                  : <div key={uuid()} />
              ))}
            </div>
          </div>
        )}
    </article>
  );
}

Tile.propTypes = {
  initState: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
};

export default Tile;
