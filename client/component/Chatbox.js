
import React, {useEffect} from 'react'
import io from 'socket.io-client';

function Chatbox({
  onlineUsers,
  user,
  // socket,
}) {
  const socket = io.connect('http://localhost:3031')
  const sendMessage = () => {
    console.log('SEND MESSAGE FIRING')
    socket.emit("send_message", {message: 'HELLO'})
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    })
  }, []);

  return (
      <>
    <box className="chat-users">
      <h4>Room: </h4>
      <p>placeholder name</p>
      <h4>Users: </h4>
      <div>{onlineUsers}</div>
    </box>
  <box className="chat-display">
      <box className="message-display">
        <p>test k;adsjasds</p>
      </box>
      <box className="message-input">
      <p>test k;adsjasds</p>
      <button onClick={sendMessage}>Send Message</button>
      </box>
  </box>   
      </>
  )
}

export default Chatbox
