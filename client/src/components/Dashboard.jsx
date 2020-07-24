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
        <section className="center--dashboard__block">
          <h3 className="center--dashboard__title">Players:</h3>
          {state.loaded
            ? Object.keys(state.players).map(player => (
              <section key={uuid()} className="center--dashboard__players">
                <h3 className="center--dashboard__player-info" style={{ color: state.players[player].color }}>
                  {state.players[player].name}
                </h3>
                <p className="center--dashboard__player-info">{`Account balance: $${state.players[player].accountBalance}M`}</p>
              </section>
            ))
            : 'Loading...'}
        </section>

        <div className="center--dashboard__block">
          <h3 className="center--dashboard__title">Actions:</h3>
        </div>
        {state.loaded
          && state.boardState.currentPlayer.id === playerId
          && state.turnInfo.canBuyProp
          ? (
            <section className="center--dashboard__button__purchase">
              <button className="button__purchase--no" type="button" onClick={() => socketFunctions.endTurn()}>
                Do not buy property
              </button>
              <button className="button__purchase--yes" type="button" onClick={() => socketFunctions.buyProperty()}>
                Buy property
              </button>
            </section>
          )
          : <></>}
        <button className="button__end-turn" type="button" onClick={() => socketFunctions.endTurn()}>
          End turn
        </button>
      </section>
    </>
  );
}
