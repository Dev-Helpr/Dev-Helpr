import React from 'react'

function Chatbox({
  onlineUsers,
  user,
}) {
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
      </box>
  </box>   
      </>
  )
}

export default Chatbox
