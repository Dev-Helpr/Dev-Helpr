// const userForm = document.getElementById('username');
// const roomForm = document.getElementById('room');
// const chatForm = document.getElementById('chat-form');
// const chatMessages = document.querySelector('.chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');
// const ioSocket = io();
//
//
// /** PARSE THE USERNAME AND ROOM NUMBER VIA URL */
// const querystring = location.search;
// const params = new URLSearchParams(querystring);
//
// const username = params.get('username');
// const room = params.get('room');
//
// /** JOIN CHATROOM */
// ioSocket.on('connection', (socket) => {
//   ioSocket.emit('joinRoom', { username, room });
//
//   /** GET ROOM AND USERS */
//   ioSocket.on('roomUsers', ({room, users}) => {
//     outputRoomName(room);
//     outputUsers(users);
//   });
//
//   /** MESSAGE FROM SERVER */
//   ioSocket.on('message', (message) => {
//     outputMessage(message);
//
//     // SCROLL DOWN
//     chatMessages.scrollTop = chatMessages.scrollHeight;
//   });
// });
//
// /** MESSAGE SUBMIT */
// chatForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//
//   // EXTRACT USERNAME AND ROOM VALUES AND USE THAT AS INPUT RATHER THAN PARSING THE URL WITH THE QS MODULE
//
//   // GET MESSAGE TEXT
//   let msg = e.target.elements.msg.value;
//   msg = msg.trim();
//
//   if (!msg) {
//     return false;
//   }
//
//   // EMIT MESSAGE TO SERVER
//   ioSocket.emit('chatMessage', msg);
//
//   // CLEAR INPUT
//   e.target.elements.msg.value = '';
//   e.target.elements.msg.focus();
// });
//
// /** OUTPUT MESSAGE TO DOM */
// function outputMessage(message) {
//   const div = document.createElement('div');
//   div.classList.add('message');
//   const p = document.createElement('p');
//   p.classList.add('meta');
//   p.innerText = message.username;
//   p.innerHTML += `<span>${message.time}</span>`;
//   div.appendChild(p);
//   const para = document.createElement('p');
//   para.classList.add('text');
//   para.innerText = message.text;
//   div.appendChild(para);
//   document.querySelector('.chat-messages').appendChild(div);
// }
//
// /** ADD ROOM NAME TO DOM */
// function outputRoomName(room) {
//   roomName.innerText = room;
// }
//
// /** ADD USERS TO DOM */
// function outputUsers(users) {
//   userList.innerHTML = '';
//   users.forEach((user) => {
//     const li = document.createElement('li');
//     li.innerText = user.username;
//     userList.appendChild(li);
//   });
// }
//
// /** PROMPT THE USER BEFORE LEAVING THE CHATROOM */
// document.getElementById('leave-btn').addEventListener('click', () => {
//   const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
//   if (leaveRoom) {
//     window.location = '../index.html';
//   } else {
//   }
// });