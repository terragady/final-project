import React, { useContext } from 'react';
import './style/Board.css';
import { stateContext } from '../App';

export default function Dashboard() {
  const { socketFunctions } = useContext(stateContext);
  return (
    <section className="center--dashboard">
      <h3>Dashboard:</h3>
    </section>
  );
}
