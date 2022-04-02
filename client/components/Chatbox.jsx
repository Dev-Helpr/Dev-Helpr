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