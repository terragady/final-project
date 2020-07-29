import React, { useState, useContext } from 'react';
import cardFlipContext from '../cardFlipContext';
import './style/BackOfCard.css';

const BackOfCard = ({ id, handleCardClick }) => {
  const { cardsBack } = useContext(cardFlipContext);
  const [backOfCard] = useState(cardsBack[id]);
  return (
    <article role="presentation" onClick={handleCardClick} className="Tile-back">
      <p className="tile-back__name" style={backOfCard.color ? {backgroundColor: backOfCard.color} : {backgroundColor: 'none'}}>{backOfCard.cardName}</p>
      <div className="tile-back__prices">
      <p className="tile-back__price">{backOfCard.price ? `Price: $${backOfCard.price}` : ''}</p>
      <p className="tile-back__rent">{backOfCard.rent ? `Rent: $${backOfCard.rent}` : ''}</p>
      </div>
      <p className="tile-back__line"></p>
      <div className="tile-back__details--wrapper" >
      <p className="tile-back__details">{backOfCard.details1 ? `${backOfCard.details1.split('$')[0]}` : ''}</p>
      <span className="tile-back__details--price">{backOfCard.details1 ? `$${backOfCard.details1.split('$')[1]}` : ''}</span>
      </div>
      <div className="tile-back__details--wrapper" >
      <p className="tile-back__details">{backOfCard.details2 ? `${backOfCard.details2.split('$')[0]}` : ''}</p>
      <span className="tile-back__details--price">{backOfCard.details2 ? `$${backOfCard.details2.split('$')[1]}` : ''}</span>
      </div>
      <div className="tile-back__details--wrapper" >
      <p className="tile-back__details">{backOfCard.details3 ? `${backOfCard.details3.split('$')[0]}` : ''}</p>
      <span className="tile-back__details--price">{backOfCard.details3 ? `$${backOfCard.details3.split('$')[1]}` : ''}</span>
      </div>
      <div className="tile-back__details--wrapper" >
      <p className="tile-back__details">{backOfCard.details4 ? `${backOfCard.details4.split('$')[0]}` : ''}</p>
      <span className="tile-back__details--price">{backOfCard.details4 ? `$${backOfCard.details4.split('$')[1]}` : ''}</span>
      </div>
      <p className="tile-back__mortgage">{backOfCard.mortgage ? `Mortgage value: $${backOfCard.mortgage}` : ''}</p>
      {/* {initState.color && initState.color !== 'railroad'
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
          <div
            className="tile__special--wrapper"
            style={
              state.loaded
                && Object.prototype.hasOwnProperty.call(state.boardState.ownedProps, id)
                ? { boxShadow: `0px 0px 1px 3px ${state.boardState.ownedProps[id].color}` }
                : {}
            }
          >
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
        )} */}
    </article>
  );
};

export default BackOfCard;
