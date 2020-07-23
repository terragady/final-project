import React, { useContext, useRef, useEffect } from 'react';
import './style/Board.css';
import { v4 as uuid} from 'uuid'
import { stateContext } from '../App';

export default function Log() {
  const { state } = useContext(stateContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [state.boardState.logs]);
  return (
    <section ref={scrollRef} className="waiting-log">
      {state.loaded ? state.boardState.logs.map(e => <p key={uuid()} className="waiting-log__item">{e}</p>) : <p>Loading...</p>}
    </section>
  );
}
