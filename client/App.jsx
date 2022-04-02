import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup'
import Login from './pages/login'
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss'

const messages = [];

/** MAIN APP LIVES HERE */
function App() {
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
          {/*{ sendMes ? messages.push(`${input.name}${input.message}`) : null }*/}
      </div>
    </div>

        // <div className="App">
        //     <Routes>
        //         <Route path='/' element={<Login/>} />
        //         <Route path='/signup' element={<Signup/>} />
        //     </Routes>
        // </div>
    )
}

export default App;