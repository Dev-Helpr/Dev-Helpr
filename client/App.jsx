import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chatbox from "./components/Chatbox.jsx";
import Signup from './pages/signup'
import Login from './pages/login'
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss'
import io from 'socket.io-client';


/** MAIN APP LIVES HERE */
function App() {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [dt, setDt] = useState('');

  /** ESTABLISH SOCKET CONNECTION */
  useEffect(() => {
    setSocket(io('http://localhost:3031'));
  }, []);

  /** SUBSCRIBE TO THE SOCKET EVENT */
  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      setSocketConnected(socket.connected);
      subscribeToDateEvent();
    });
    socket.on('disconnect', () => {
      setSocketConnected(socket.connected);
    });

    socket.on('getDate', data => {
      setDt(data);
    });
  }, [socket]);

  /** MANAGE SOCKET CONNECTION */
  const handleSocketConnection = () => {
    if (socketConnected) socket.disconnect();
    else socket.connect();
  };

  /** SUBSCRIBE TO SOCKET DATE EVENT */
  const subscribeToDateEvent = (interval = 1000) => {
    socket.emit('subscribeToDateEvent', interval);
  };

  return (
    <div className='App'>
      <h2>Welcome to Socket.IO App!</h2>

      <div><b>Connection status:</b> {socketConnected ? 'Connected' : 'Disconnected'}</div>
      <input
        type="button"
        style={{ marginTop: 10 }}
        value={socketConnected ? 'Disconnect' : 'Connect'}
        onClick={handleSocketConnection} />

      <div style={{ marginTop: 20 }}><b>Date: </b> {dt}</div>
    </div>

    // <div className="App">
    //   {/*<Chatbox />*/}
    //   <div>
    //     <b>CONNECTION STATUS:</b> {socketConnected ? 'Connected' : 'Disconnected'}
    //   </div>
    //   <input
    //     type={'button'}
    //     style={{ marginTop: 10 }}
    //     value={socketConnected ? 'Disconnect' : 'Connect'}
    //     onClick={handleSocketConnection} />
    //     {/*<Routes>*/}
    //     {/*    <Route path='/' element={<Login/>} />*/}
    //     {/*    <Route path='/signup' element={<Signup/>} />*/}
    //     {/*</Routes>*/}
    // </div>
  )
}

export default App;