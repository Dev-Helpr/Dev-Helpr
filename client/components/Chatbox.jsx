import React, { useState, useEffect } from 'react';
import * as io from '../../node_modules/socket.io/client-dist/socket.io.js';

// const userForm = document.getElementById('username');
// const roomForm = document.getElementById('room');
// const chatForm = document.getElementById('chat-form');
// const chatMessages = document.getElementsByClassName('chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');
const ioSocket = io();


function Chatbox() {
  /** INITIALIZE STATE OF CHATBOX COMPONENT **/
  const [username, setUsername] = useState(undefined);
  const [room, setRoom] = useState(undefined);
  const [userList, setUserList] = useState(undefined);
  const [ticketResolved, setTicketResolved] = useState(false);
  const [messages, setMessages] = useState([]);

  /** BEGIN CHAT SESSION ONCE CHATBOX COMPONENT MOUNTS **/
  ioSocket.on('connection', (socket) => {

    /* CONFIRM DUPLEX COMMUNICATION WITH SERVER */
    console.log(socket);
    ioSocket.emit('client response', 'this is a response from the client...');

    /* JOIN CHATROOM */
    /*** SET DUMMY USER. MUST CONNECT WITH TICKET SUBMITTER ***/
    const username = `dummy-user-${Math.floor(Math.random() * 10)}`;
    const room = 'dummy-room';
    ioSocket.emit('joinRoom', { username, room });

    /* GET ROOM AND USERS */
    ioSocket.on('roomUsers', (socket) => {
      const currentUsers = [];
      for (let i = 0; i < socket.users.length; i++) {
        currentUsers.push(<div>{socket.users[i].username}</div>);
      }
      setUserList(currentUsers);
      setRoom(socket.room);
    });

    /* MESSAGE FROM SERVER --- THIS NEEDS REWORKING, STATE IS MANIPULATED DIRECTLY */
    ioSocket.on('message', (message) => {
      setMessages([...messages, outputMessage(message)]);
      messages.push(outputMessage(message));

      /* AUTO-SCROLL DOWN */
      const el = document.getElementById('chat-messages')
      if (el) el.scrollTop = el.scrollHeight
    })
  });

  /* MESSAGE SUBMIT */
  window.addEventListener('submit', (e) => {
    e.preventDefault();

    /* GET MESSAGE TEXT */
    let msg = e.target.elements.msg.value;
    msg = msg.trim();

    if (!msg) {
      return false;
    }

    /* EMIT MESSAGE TO SERVER */
    ioSocket.emit('chatMessage', msg);

    /* CLEAR INPUT */
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
  });

  /* OUTPUT MESSAGE TO COMPONENT */
  const outputMessage = (message) => {
    return (
      <div className='message'>
        <p>
          <span style={{fontWeight: 'bold'}}>{message.username} </span>
          <span>{message.time}</span>
        </p>
        <p>
          {message.text}
        </p>
      </div>
    );
  };

  // TODO: ROUTE USERS IN THEIR OWN ROOMS BASED ON SOCKET ID, HASHED VALUE OR CLIENT ID
  /** ADD ROOM NAME AND USERS TO CHATBOX COMPONENT **/
  const outputRoomName = (room) => {
    setRoom(room);
  };

  /** PROMPT THE USER BEFORE LEAVING THE CHATROOM **/
  // button.addEventListener('click', () => {
  //   const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    // if (leaveRoom) {
    //   window.location = '../index.html';
    // } else {
    // }
  // });


  return(
    <div>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Dev-Helpr Chat</title>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
        integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" type="text/css" href='../stylesheets/chatbox.css' />

      <div className="chat-container">
        <header className="chat-header">
          <h2><i className="fas fa-smile"/>Dev-Helpr</h2>
          <a id="leave-btn" className="btn">Leave Room</a>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h2><i className="fas fa-comments"/> Room Name:<br/><p id="room-name">{room}</p></h2>
            <h2><i className="fas fa-users"/> Users:<br/><ul id="users">{userList}</ul></h2>
            {/*<ul id="users"> </ul>*/}
          </div>
          <div id='chat-messages' className="chat-messages">
            {messages}
          </div>
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