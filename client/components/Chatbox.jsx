// TODO: CONVERT CHAT.HTML DOM TO REACT COMPONENT
import React from 'react';

const userForm = document.getElementById('username');
const roomForm = document.getElementById('room');
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const ioSocket = io();


function Chatbox() {
  //
  /** PARSE THE USERNAME AND ROOM NUMBER VIA URL */
  const querystring = location.search;
  const params = new URLSearchParams(querystring);

  const username = params.get('username');
  const room = params.get('room');

  /** JOIN CHATROOM */
  ioSocket.on('connection', (socket) => {
    ioSocket.emit('joinRoom', { username, room });

    /** GET ROOM AND USERS */
    ioSocket.on('roomUsers', ({room, users}) => {
      outputRoomName(room);
      outputUsers(users);
    });

    /** MESSAGE FROM SERVER */
    ioSocket.on('message', (message) => {
      outputMessage(message);

      // SCROLL DOWN
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  });

  /** MESSAGE SUBMIT */
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // EXTRACT USERNAME AND ROOM VALUES AND USE THAT AS INPUT RATHER THAN PARSING THE URL WITH THE QS MODULE

    // GET MESSAGE TEXT
    let msg = e.target.elements.msg.value;
    msg = msg.trim();

    if (!msg) {
      return false;
    }

    // EMIT MESSAGE TO SERVER
    ioSocket.emit('chatMessage', msg);

    // CLEAR INPUT
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
  });

  /** OUTPUT MESSAGE TO DOM */
  function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }

  /** ADD ROOM NAME TO DOM */
  function outputRoomName(room) {
    roomName.innerText = room;
  }

  /** ADD USERS TO DOM */
  function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
  }

  /** PROMPT THE USER BEFORE LEAVING THE CHATROOM */
  document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
  });

  return(
    <div>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Dev-Helpr Chat</title>
      {/*<link*/}
      {/*  rel="stylesheet"*/}
      {/*  type="text/css"*/}
      {/*  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"*/}
      {/*  integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="*/}
      {/*  crossOrigin="anonymous"*/}
      {/*/>*/}

      <link rel="stylesheet" type="text/css" href='../stylesheets/chatbox.css' />

      <div className="chat-container">
        <header className="chat-header">
          <h2><i className="fas fa-smile"/>Dev-Helpr</h2>
          <a id="leave-btn" className="btn">Leave Room</a>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h2><i className="fas fa-comments"/> Room Name:</h2>
            <h2 id="room-name"/>
            <h2><i className="fas fa-users"/> Users</h2>
            <ul id="users"/>
          </div>
          <div className="chat-messages"/>
        </main>
        <div className="chat-form-container">
          <form id="chat-form">
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
              autoComplete="off"
            />
            <button className="btn"><i className="fas fa-paper-plane"/>Send</button>
          </form>
        </div>
      </div>
    </div>
    )
}

export default Chatbox;