import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function Chatbox(){
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