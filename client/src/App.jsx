import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Dice from './components/Dice';
import io from 'socket.io-client';
import { v4 as uuid } from 'uuid';

const socket = io.connect('http://localhost:8080');

// socket.on('message', message => {
//   console.log(message);
// })



function App() {
  const [inGame, setInGame] = useState(false);
  const [roomId, setRoomId] = useState(false);
  const [roomInput, setRoomInput] = useState(false);

  socket.on('room created', id => {
    setRoomId(id);
    console.log(roomId);
  });

  const createRoom = () => {
    socket.emit('create new room', uuid());
  }

  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit('join existing room', roomInput);
  }

  return (
    <main className="App">
      {inGame
        ? <Board />
        : (<section className="App--buttons">
             <button className="button--start" onClick={createRoom}>New room</button>
             <form onSubmit={joinRoom}>
               <input onChange={(e) => setRoomInput(e.target.value)}/>
               <button className="button--join" type="submit" >Join existing room</button>
             </form>
           </section>)
      }
    </main>
  );
}

export default App;