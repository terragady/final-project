import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Dice from './components/Dice';
import socket from 'socket.io-client';
import { v4 as uuid } from 'uuid';
const io = socket('http://localhost:8080');

// socket.on('message', message => {
//   console.log(message);
// })



function App() {
  const [inGame, setInGame] = useState(false);
  const [roomId, setRoomId] = useState(false);
  const [roomInput, setRoomInput] = useState(false);
  const [name, setName] = useState(false);


  useEffect(() => {
    io.once('Joined room', () => console.log('A player has joined the room'));
  },[name])
  const createRoom = async () => {
    // const id = uuid()
    const id = 1
    setRoomId(id);
    const name = prompt('Enter your name:')
    io.emit('New room', id, name);
    console.log(id);
    io.once('Welcome message', (x) => console.log(x)) 
  }

  const joinRoom = (e) => {
    e.preventDefault();
    const id = 1;
    setRoomId(1);
    document.querySelector('.input--join').value = '';
    io.emit('Join room', roomInput);
    // const name = prompt('Enter your name:')
    // io.once('Joined room', () => console.log('A player has joined the room'));
    setRoomInput('')
    setName('Tina')
  }



  return (
    <main className="App">
      {inGame
        ? <Board />
        : (<section className="App--buttons">
             <button className="button--start" onClick={createRoom}>New room</button>
             <form onSubmit={joinRoom}>
               <input className="input--join" type="text" onChange={(e) => setRoomInput(e.target.value)} />
               <button className="button--join" type="submit" >Join existing room</button>
             </form>
           </section>)
      }
    </main>
  );
}

export default App;