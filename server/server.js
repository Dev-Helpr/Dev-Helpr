const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const socketio = require('socket.io')
// const Qs = require('qs');
const Server = socketio.Server;
const io = new Server(server);

const formatMessage = require('../utils/messages.js');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('../utils/users');

const PORT = process.env.PORT || 3031;


const botName = 'Dev-Helpr Bot';

/** HANDLE REQUESTS FOR STATIC FILES */
app.use(express.static(path.resolve(__dirname, '../client')));

/** HANDLE PARSING REQUEST BODY FOR JSON AND URL */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** REQUIRE ROUTERS */
const apiRouter = require(path.resolve(__dirname, './routes/api.js'));
const { options } = require("pg/lib/defaults");
const Qs = require("nodemon/lib/cli");

/** DEFINE ROUTE HANDLERS */
app.use('/api', apiRouter);


/** ROUTE HANDLERS TO RESPOND WITH MAIN APP -- WEBPACK SERVES THE INDEX.HTML FILE ON STARTUP */
// app.get('/', (request, response) => {
//   return response.sendFile(path.resolve(__dirname, '../client/pages/homepage.html'));
// });

app.get('/chat.html', (request, response) => {
  return response.sendFile(path.resolve(__dirname, '../client/pages/chat.html'));
});

/** CATCH-ALL ROUTE HANDLER FOR ANY REQUESTS TO AN UNKNOWN ROUTE */
app.use('*', (request, response) => {
  response.status(404).send('Error: Page not found');
});

/** CONFIGURE EXPRESS GLOBAL ERROR HANDLER */
app.use((error, request, response, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, { error: error });
  response.status(errorObj.status).json(errorObj.message.err)
});

/** NOTIFY THE CLIENT OF CLIENT CONNECTION ACTIVITY -- old code */
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
//
// /** PRINT THE CHAT MESSAGE EVENT */
// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log(`chat message: ${msg}`);
//   });
// });
//
// /** TEST: EMIT A MESSAGE TO ALL CONNECTED USERS */
// io.on('connection', (socket) => {
//   socket.broadcast.emit('hello everyone!');
// });
//
// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// });


/** RUN WEBSOCKET WHEN CLIENT CONNECTS TO CHATROOM */

io.on('connection', (socket) => {
  console.log('user has connected...');

  socket.on('disconnect', () => {
    console.log('user has disconnected...')
  });

  socket.on('joinRoom', ({ username='mike', room=1 }) => { // PASS INFO FROM CLIENT
    console.log(`${username} has joined room ${room}...`);
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // WELCOME CURRENT USER
    socket.emit('message', formatMessage(botName, 'Welcome to Dev-Helpr Chat!'));

    // BROADCAST WHEN A USER CONNECTS
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat.`)
      );

    // SEND USERS AND ROOM INFO
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // LISTEN FOR CHAT MESSAGE
  socket.on('chatMessage', msg => {
  const user = getCurrentUser(socket.id);

  io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // RUNS WHEN CLIENT DISCONNECTS
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat.`)
      );

      // SEND USERS AND ROOM INFO
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});


/** START THE SERVER AND LISTEN FOR CLIENT REQUESTS */
server.listen(PORT,() => {
  console.log(`Server connected: listening on port ${PORT}.`);
});



module.exports = app;
