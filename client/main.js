const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

/** GET USERNAME AND ROOM FROM URL */
console.log(document);

const socket = io();

// const { username, room } = Qs.parse(location.search, {
//   ignoreQueryPrefix: true,
// });

/** JOIN CHATROOM */
socket.on('connection', (socket) => {
  console.log('joined');
  socket.emit('joinRoom', {username, room});

  /** GET ROOM AND USERS */
  socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
  });

  /** MESSAGE FROM SERVER */
  socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);

    // SCROLL DOWN
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
});

/** MESSAGE SUBMIT */
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('message event fired!')

  // GET MESSAGE TEXT
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // EMIT MESSAGE TO SERVER
  socket.emit('chatMessage', msg);

  // Clear input
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