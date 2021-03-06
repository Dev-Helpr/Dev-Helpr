
import React, {useEffect, useState} from 'react'
import 'regenerator-runtime/runtime'
import io from 'socket.io-client';
import Message from './Message';
import './../stylesheets/chatBox.css';

function Chatbox({
  onlineUsers,
  user,
  // socket,
}) {
  const [chatRoom, setChatRoom] = useState('global')
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  const socket = io.connect('http://localhost:3031')

  const sendMessage = async () => {
    console.log('SEND MESSAGE FIRING')
    if (currentMessage !== '') {
      const messageData = {
        room: chatRoom,
        messenger: user.userName,
        message: currentMessage,
      }
      await socket.emit("send_message", messageData);
      setMessageList((chatLog) => [...chatLog, messageData])
    }
  }

  const joinRoom = () => {
    if ( chatRoom !== ""){
      socket.emit("join_room", chatRoom);
    }
  }
  joinRoom();
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data)
      setMessageList((chatLog) => [...chatLog, data])
    })
  }, []);

  return (
      <>
    <div className="chat-users">
      <h4>Room: </h4>
      <p>placeholder name</p>
      <h4>Users: </h4>
      {/* <div>{onlineUsers}</div> */}
    </div>
  <div className="chat-display">
      <div className="message-display">
        {messageList.map((data, idx) => {
          return (
            <Message  key={idx} messenger={data.messenger} message={data.message}/>
          )
        })}
      </div>
      <div className="message-input">
        <input type='text' placeholder='Enter message here...' onChange={(event) => {
          setCurrentMessage(event.target.value)
        }} />
      <button onClick={sendMessage}>Send Message</button>
      </div>
  </div>
      </>
  )
}

export default Chatbox