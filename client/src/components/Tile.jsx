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
              className="tile__color-box"
              style={
                state.loaded
                  && Object.prototype.hasOwnProperty.call(state.boardState.ownedProps, id)
                  ? { backgroundColor: initState.color, boxShadow: `0px 0px 1px 3px ${state.boardState.ownedProps[id].color}` }
                  : { backgroundColor: initState.color }
              }
            />
            <div className="tile__wrapper">
              <p className="tile__street-name">{initState.streetName}</p>
              <div className="player__token--wrapper">
                {Object.keys(state.players).map(e => (
                  state.players[e].currentTile === id
                    ? <div key={uuid()} className="player__token" style={{ backgroundColor: state.players[e].color }} />
                    : <div key={uuid()} />
                ))}
              </div>
              <p className="tile__price">{`$${initState.price}M`}</p>
            </div>
          </>
        )
        : (
          <div className="tile__special--wrapper">
            <p className="tile__special-name">{initState.streetName}</p>
            <div className="player__token--wrapper">
              {Object.keys(state.players).map(e => (
                state.players[e].currentTile === id
                  ? <div key={uuid()} className="player__token" style={{ backgroundColor: state.players[e].color }} />
                  : <div key={uuid()} />
              ))}
            </div>
            <p className="tile__special--price">{initState.price ? `$${initState.price}M` : ''}</p>
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
