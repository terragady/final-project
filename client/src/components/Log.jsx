import React, { useContext } from 'react';
import './style/Board.css';
import { stateContext } from '../App';

export default function Log() {
	const { state, socketsFunctions } = useContext(stateContext);

	const mapLogs = () => {
    state.boardState.logs.map( e => {
      return e
    })
	};

	return (
		<div className="waiting-room">
			<section className="waiting-log">
				<h3>Log:</h3>
				{state.loaded ? mapLogs() : <p>Loading...</p>}
			</section>
			<section className="waiting-log__game">
				<h3>Log:</h3>
			</section>
		</div>
	);
}
