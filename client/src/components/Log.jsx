import React, { useContext, useRef, useEffect } from 'react';
import './style/Board.css';
import { stateContext } from '../App';

export default function Log() {
  const { state, socketsFunctions } = useContext(stateContext);
  const scrollRef = useRef(null);

  
  function scrollToBottom (id) {
   var div = document.querySelectorAll('waiting-log');
   div.scrollTop = div.scrollHeight - div.clientHeight;
}

  useEffect(() => {
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [state.boardState.logs])



	return (
		<div className="waiting-room">
				<h3>Log:</h3>
			<section ref={scrollRef} className="waiting-log">
        {state.loaded ? state.boardState.logs.map(e => <p>{e}</p>): <p>Loading...</p>}
			</section>
			<section className="waiting-log__game">
				<h3>Log:</h3>
			</section>
		</div>
	);
}
