import React, { useContext, useRef, useEffect } from 'react';
import './style/Board.css';
import { stateContext } from '../App';

export default function Log() {
  const { state, socketsFunctions } = useContext(stateContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [state.boardState.logs]);
  return (
    <section ref={scrollRef} className="waiting-log">
      {state.loaded ? state.boardState.logs.map(e => <p className="waiting-log__item">{e}</p>) : <p>Loading...</p>}
    </section>
  );
}
