const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const Server = require('socket.io').Server
const io = new Server(server);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { protect } = require('./controllers/authControllers');
const { options } = require("pg/lib/defaults");

/** IMPORT UTILS **/
const formatMessage = require('../utils/messages.js');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('../utils/users');

const PORT = process.env.PORT || 3031;
const botName = 'Dev-Helpr Bot';

/** HANDLE REQUESTS FOR STATIC FILES **/
app.use(express.static(path.resolve(__dirname, '../client')));

/** REQUIRE ROUTERS **/
const apiRouter = require(path.resolve(__dirname, './routes/api.js'));
const usersRouter = require(path.resolve(__dirname, './routes/users'));
const ticketsRouter = require(path.resolve(__dirname, './routes/tickets'));
const refreshAccess = require('./routes/refresh')

/** HANDLE PARSING REQUEST BODY FOR JSON AND URL **/
//can create a cors function later to only allow certain origins (domains) to access our apps backend
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/** HANDLE REQUESTS FOR STATIC FILES **/
app.use(express.static(path.resolve(__dirname, '../client/stylesheets/styles.css')));

// TODO: HANDLE AND CONNECT ROUTERS IN LIEU OF HTML FILE ROUTING
/** DEFINE ROUTE HANDLERS */
app.use('/api', apiRouter);
app.use('/api/users/', usersRouter);
//create a (GET) refresh route here or in usersRouter ?
app.use('/api/refresh', refreshAccess);
// app.use(protect); //user will need to be logged in to access any route below this point
app.use('/api/tickets/', ticketsRouter)

/** CATCH-ALL ROUTE HANDLER FOR ANY REQUESTS TO AN UNKNOWN ROUTE */
app.use('*', (request, response) => {
  response.status(404).send('Error: Page not found');
});

/** CONFIGURE EXPRESS GLOBAL ERROR HANDLER **/
app.use((error, request, response, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, { error: error });
  response.status(errorObj.status).json(errorObj.message.err)
});

// TODO: REVIEW CURRENT WEBSOCKET IMPLEMENTATION ARCHITECTURE
/** RUN WEBSOCKET WHEN CLIENT CONNECTS TO CHATBOX **/
io.on('connection', (socket) => {
  socket.on('client response', () => {
    console.log('client has established connection...');
  })

  socket.emit('connection', () => 'returned statement');
  /* RUNS WHEN CLIENT CONNECTS */
  console.log('user has connected...');

  /* RUNS WHEN CLIENT DISCONNECTS */
  socket.on('disconnect', () => {
    console.log('user has disconnected...');
  });

  /* JOIN USER INTO ASSIGNED ROOM */
  socket.on('joinRoom', ({ username, room }) => {
    console.log(`${username} has joined room ${room}...`);

    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    /* WELCOME CURRENT USER */
    socket.emit('message', formatMessage(botName, 'Welcome to Dev-Helpr Chat!'));

    /* BROADCAST WHEN A USER CONNECTS */
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat.`)
      );

    /* SEND USERS AND ROOM INFO */
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  /* LISTEN FOR CHAT MESSAGE */
  socket.on('chatMessage', msg => {
  const user = getCurrentUser(socket.id);
  io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  /* RUNS WHEN CLIENT DISCONNECTS */
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat.`)
      );

      /* SEND USERS AND ROOM INFO */
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

/** START THE SERVER AND LISTEN FOR CLIENT REQUESTS **/
server.listen(PORT,() => {
  console.log(`Server connected: listening on port ${PORT}.`);
});


module.exports = app;