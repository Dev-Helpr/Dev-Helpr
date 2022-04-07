import React, {useState} from 'react';
import * as io from '../../node_modules/socket.io/client-dist/socket.io.js';

const userForm = document.getElementById('username');
const roomForm = document.getElementById('room');
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const ioSocket = io();


function Chatbox() {

  /** INITIALIZE STATE OF CHATBOX COMPONENT **/
  const [username, setUsername] = useState('Mike');
  const [room, setRoom] = useState(90283745);
  const [userList, setUserList] = useState([]);
  const [ticketResolved, setTicketResolved] = useState(false);
  const [messages, addMessages] = useState([]);


  /** BEGIN CHAT SESSION ONCE CHATBOX COMPONENT MOUNTS **/
  /* DO WE USE useEffect() HERE? */
  ioSocket.on('connection', () => {

    /* CONFIRM DUPLEX COMMUNICATION WITH SERVER */
    ioSocket.emit('client response');
    console.log('connection established with server...');

    /* JOIN CHATROOM */
    ioSocket.emit('joinRoom', {username, room});

    /* GET ROOM AND USERS */
    ioSocket.on('roomUsers', (socket) => {
      console.log(socket.user, socket.room);
      // setRoom(socket.room);
      // setUserList(socket.users)
    });
    // ioSocket.on('roomUsers', ({room, users}) => {
    //   outputRoomName(room);
    //   outputUsers(users);
    // });

    /* MESSAGE FROM SERVER */
    ioSocket.on('message', (message) => {
      addMessages([...messages, outputMessage(message)]);
      messages.push(outputMessage(message));
    })

    /* SCROLL DOWN */
    // chatMessages.scrollTop = chatMessages.scrollHeight;
    // });
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

  /* OUTPUT MESSAGE TO DOM */
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

  /** ADD ROOM NAME AND USERS TO CHATBOX COMPONENT **/


  // const outputRoomName = (room) => {
  //   return setRoom(room);
  // }
  //
  /** ADD USERS TO DOM **/
  const outputUsers = ({username, users = [...userList]}) => {
    users.push(<li>{username}</li>);
    setUserList(users);
  };
  // userList.innerHTML = '';
  // users.forEach((user) => {
  //   const li = document.createElement('li');
  //   li.innerText = user.username;
  //   userList.appendChild(li);
  // });


  /** PROMPT THE USER BEFORE LEAVING THE CHATROOM **/
  // document.getElementById('leave-btn').addEventListener('click', () => {
  //   const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  //   if (leaveRoom) {
  //     window.location = '../index.html';
  //   } else {
  //   }
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
            <h2><i className="fas fa-comments"/> Room Name:<br/><h2 id="room-name">{room}</h2></h2>
            <h2><i className="fas fa-users"/> Users:<br/><ul id="users">{}</ul></h2>
            {/*<ul id="users"> </ul>*/}
          </div>
          <div className="chat-messages">
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