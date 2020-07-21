import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Dice from './components/Dice';
import io from 'socket.io-client';
import { v4 as uuid } from 'uuid';

const socket = io.connect('http://localhost:8080');
socket.on('message', message => {
  console.log(message);
})



function App() {
  const [inGame, setInGame] = useState(false);
  const createRoom = () => {
    const roomId = uuid()
    socket.emit('create new room', roomId);
  }
  return (
    <main className="App">
      {inGame
        ? <Board />
        : (<section className="App--buttons">
             <button className="button--start" onClick={createRoom}>New room</button>
             <button className="button--join">Join existing room</button>
           </section>)
      }
    </main>
  );
}

export default App;