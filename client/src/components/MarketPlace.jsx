import React, { useContext } from 'react'
import stateContext from '../internal';
import './style/MarketPlace.css';

const MarketPlace = () => {
  const { socketFunctions, state, playerId } = useContext(stateContext);
  return (
    <section className="dashboard__market-place--container">
    <h1 className="dashboard__market-place__title">The open market:</h1>
    <section className="dashboard__market-place">
      <section className="dashboard__market-place__block">
        <h3 className="dashboard__market-place__subtitle">Seller</h3>
        <p>cell1_1</p>
        <p>cell1_2</p>
      </section>
      <section className="dashboard__market-place__block">
        <h3 className="dashboard__market-place__subtitle">Property</h3>
        <p>cell2_1</p>
        <p>cell2_2</p>
      </section>
      <section className="dashboard__market-place__block">
        <h3 className="dashboard__market-place__subtitle">Price</h3>
        <p>cell3_1</p>
        <p>cell3_2</p>
      </section>
      <section className="dashboard__market-place__block">
        <div className="dashboard__market-place__buttons">
        <p className="dashboard__market-place__icon-v">✓</p>
        <p className="dashboard__market-place__icon-x">❌</p>
        </div>
        <div className="dashboard__market-place__buttons">
        <p className="dashboard__market-place__icon-v">✓</p>
        <p className="dashboard__market-place__icon-x">❌</p>
        </div>
      </section>
    </section>
    </section>
  )
}

export default MarketPlace;