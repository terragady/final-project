import React, { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './style/Dashboard.css';
import MarketPlace from './MarketPlace';
import stateContext from '../internal';
import tileNames from './BoardInitState';
import sellPromptContext from '../sellPromptContext';

export default function Dashboard() {
  const { socketFunctions, state, playerId } = useContext(stateContext);
  const { openSale, setOpenSale } = useContext(sellPromptContext);
  const [priceInput, setPriceInput] = useState(false);

  const removeSellPropPrompt = e => {
    e.preventDefault();
    setOpenSale(false);
  };

  return (
    <>
      <section className="center__dashboard--container">
        <section className="center__dashboard">
          <article className="center__dashboard--img" />

          <section className="center__dashboard__block">
            <h3 className="center__dashboard__title">Players:</h3>

            {state.loaded
              ? Object.keys(state.players).map(player => (
                <section key={uuid()} className="center__dashboard__players">
                  <h3 className="center__dashboard__player-info__name" style={{ color: state.players[player].color, textShadow: '0px 0px 1px black' }}>
                    {state.players[player].name}
                  </h3>
                  <p className="center__dashboard__player-info">{`Account balance: $${state.players[player].accountBalance}M`}</p>
                </section>
              ))
              : 'Loading...'}
          </section>

          <section className="center__dashboard__block">
            {state.loaded
          && state.boardState.currentPlayer.id === playerId
          && state.turnInfo.canBuyProp
              ? (
                <div className="open-market__sell-toast">
                  <section className="center__dashboard__button__purchase">
                    <button className="button__purchase--no" type="button" onClick={() => socketFunctions.endTurn()}>
                      Do not buy property
                    </button>
                    <button className="button__purchase--yes" type="button" onClick={() => socketFunctions.buyProperty()}>
                      Buy property
                    </button>
                  </section>
                </div>
              )
              : <></>}
            {state.loaded && openSale
              ? (
                <div className="open-market__sell-toast">
                  <h3 className="open-market__sell-toast__close" onClick={removeSellPropPrompt}>❌</h3>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      socketFunctions.putOpenMarket({ ...openSale, price: priceInput });
                      setPriceInput('');
                      setOpenSale(false);
                    }}
                    className="open-market__sell-toast-form"
                  >
                    <h3>
                      Sell
                      {tileNames[openSale.tileID].streetName}
                      {' '}
                      for:
                    </h3>
                    <p>Input in millions. e.g. 200 = $200M</p>
                    <input
                      className="open-market__sell-toast-input"
                      onChange={e => setPriceInput(parseInt(e.target.value))}
                      type="number"
                      min="20"
                      autoFocus
                    />
                    <button className="open-market__sell-toast-button" type="submit">Put on the open market</button>
                  </form>
                </div>
              )
              : <></>}
            <button className="button__end-turn" type="button" onClick={() => socketFunctions.endTurn()}>
              End turn
            </button>
          </section>
          <MarketPlace />
        </section>
        <section className="center__dashboard--current-player">
          <h2 className="center__dashboard__player-info">Current player:</h2>
          <h3 className="center__dashboard__player-info__current">
            {state.loaded
              ? (
                state.players[state.boardState.currentPlayer.id] ? `${state.players[state.boardState.currentPlayer.id].name}` : 'None'
              )
              : 'Loading...'}
          </h3>
        </section>
      </section>
    </>
  );
}
