import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import './style/Board.css';
import { stateContext } from '../App';

export default function Dashboard() {
  const { socketFunctions, state, playerId } = useContext(stateContext);

  return (
    <>
      <h3>Dashboard:</h3>
      <section className="center--dashboard">
        <div className="center--dashboard__players">
          <h3>General information:</h3>
          {state.loaded
            ? Object.keys(state.players).map(player => (
              <div key={uuid()} className="player-wrapper">
                <h3 style={{ color: state.players[player].color }}>
                  {state.players[player].name}
                </h3>
                <p>{`Account balance: $${state.players[player].accountBalance}M`}</p>
              </div>
            ))
            : 'Loading...'}
        </div>
        <div className="center--dashboard__player">
          Your information:
        </div>
        {state.loaded
          && state.boardState.currentPlayer.id === playerId
          && state.turnInfo.canBuyProp
          ? (
            <div className="wanna-buy">
              <button className="button__end-turn" type="button" onClick={() => socketFunctions.endTurn()}>
                No
              </button>
              <button className="button__end-turn" type="button" onClick={() => socketFunctions.buyProperty()}>
                Yes
              </button>
            </div>
          )
          : <></>}
        <button className="button__end-turn" type="button" onClick={() => socketFunctions.endTurn()}>
          TURN
        </button>
      </section>
    </>
  );
}
