import React, {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import io from "socket.io-client";
// const socket = io.connect("http://localhost:3030");


function Chatbox({
  socket,
  users, 
  onlineUsers,
  arrOfUsers,
}){
  console.log('arrOfUsers:  ',arrOfUsers)
  console.log('onlineUsers:  ',onlineUsers)
const [chatRoom, setChatRoom] = useState("global");
const [chatUserNames, setChatUserNames] = useState("")

// const joinRoom = () => {
//   console.log('attempting to join room')
//   if (chatRoom !== ""){
//     socket.emit("join_room", chatRoom)
//   }
// }

const sendMessage = () => {
  socket.emit("send_message", { message: "Hello"});
};
useEffect(() => {
  socket.on("receive_message", (data) => {
    alert(data.message);
  })
}, [socket]);
sendMessage();
  return(
    <div>
      <h4>Dev-Helpr Chat</h4>
      <title>Dev-Helpr Chat</title>

      <link
        rel="stylesheet"
        type="text/html"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
        integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" type="text/css" href='../stylesheets/chatbox.css' />

      <div className="chat-container">
        <header className="chat-header">
          <h1><i className="fas fa-smile"/> ChatCord</h1>
          <a id="leave-btn" className="btn">Leave Room</a>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3><i className="fas fa-comments"/> Room Name:</h3>
            <h2 id="room-name"/>
            <h3><i className="fas fa-users"/> Users</h3>
              <div>{onlineUsers}</div>
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