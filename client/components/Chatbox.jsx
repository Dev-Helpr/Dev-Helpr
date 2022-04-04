import React, { useState, useEffect } from 'react';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss'

const messages = [];

function Chatbox() {
  const [ input, setInput ] = useState({ name: '', message: '' });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    messages.push([input.name, <br/>, input.message, <br/>, <br/>]);
    setInput({...input});
    document.getElementById('message').value = '';
  };

  return (
    <div className="container">
      <div className="my-5 jumbotron">
        <h1 className="mb-3 display-4">Send Message</h1>
        <input name='name' id='name' className="mb-3 form-control" placeholder="Name" onChange={handleChange} />
        <textarea name='message' id='message' className="mb-3 form-control" placeholder="Message" onChange={handleChange} />
        <button id='send' className="btn btn-success" onClick={handleClick}>Send</button>
        <div id='chatBox' style={{ borderStyle: 'solid' }}>{messages}</div>
      </div>
    </div>
  )
}


export default Chatbox;


// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Chatbox from "./components/Chatbox.jsx";
// import Signup from './pages/signup'
// import Login from './pages/login'
// import 'bootstrap';
// import 'bootstrap/scss/bootstrap.scss'
// import io from 'socket.io-client';
//
//
// /** MAIN APP LIVES HERE */
// function App() {
//   const [socket, setSocket] = useState(null);
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [dt, setDt] = useState('');
//
//   /** ESTABLISH SOCKET CONNECTION */
//   useEffect(() => {
//     setSocket(io('http://localhost:3031'));
//   }, []);
//
//   /** SUBSCRIBE TO THE SOCKET EVENT */
//   useEffect(() => {
//     if (!socket) return;
//
//     socket.on('connect', () => {
//       setSocketConnected(socket.connected);
//       subscribeToDateEvent();
//     });
//     socket.on('disconnect', () => {
//       setSocketConnected(socket.connected);
//     });
//
//     socket.on('getDate', data => {
//       setDt(data);
//     });
//   }, [socket]);
//
//   /** MANAGE SOCKET CONNECTION */
//   const handleSocketConnection = () => {
//     if (socketConnected) socket.disconnect();
//     else socket.connect();
//   };
//
//   /** SUBSCRIBE TO SOCKET DATE EVENT */
//   const subscribeToDateEvent = (interval = 1000) => {
//     socket.emit('subscribeToDateEvent', interval);
//   };
//
//   return (
//       <div className='App'>
//         <h2>Welcome to Socket.IO App!</h2>
//
//         <div><b>Connection status:</b> {socketConnected ? 'Connected' : 'Disconnected'}</div>
//         <input
//           type="button"
//           style={{ marginTop: 10 }}
//           value={socketConnected ? 'Disconnect' : 'Connect'}
//           onClick={handleSocketConnection} />
//
//         <div style={{ marginTop: 20 }}><b>Date: </b> {dt}</div>
//       </div>

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
    // )
