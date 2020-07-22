import React, { useContext } from 'react';
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
              style={initState.color
                ? { backgroundColor: initState.color }
                : { color: 'black' }}
            />
            <div className="tile--wrapper">
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
          <div className="tile--wrapper">
            <p className="tile--special-name">{initState.streetName}</p>
            <div className="token-wrapper">
              {Object.keys(state.players).map(e => (
                state.players[e].currentTile === id
                  ? <div className="player-token" style={{ backgroundColor: state.players[e].color }} />
                  : <></>
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
