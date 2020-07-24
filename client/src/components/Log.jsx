import React, {
  useContext, useRef, useEffect, useState,
} from 'react';
import './style/Board.css';
import { v4 as uuid } from 'uuid';
import { stateContext } from '../App';

export default function Log() {
  const { state, socketFunctions } = useContext(stateContext);
  const [chat, setChat] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [state.boardState.logs]);

  const sendChat = e => {
    e.preventDefault();
    if (chat) socketFunctions.sendChat(chat);
    setChat('');
    e.target.reset();
  };
  return (
    <>
      <section ref={scrollRef} className="waiting-log">
        {state.loaded ? state.boardState.logs.map(e => <p key={uuid()} className="waiting-log__item">{e}</p>) : <p>Loading...</p>}
      </section>
      <div className="chat">
        <form onSubmit={e => sendChat(e)}>
          Chat:
          <input className="chat__input" onChange={e => setChat(e.target.value)} type="text" name="chat" id="chat" autoComplete="off" />
        </form>
      </div>

    </>
  );
}
