const express = require("express");
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const socketServer = require('socket.io').Server
const io = new socketServer(server);
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
} = require('../utils/users'); // ADD UTILS TO DIR

const PORT = process.env.PORT || 3030;
const botName = 'Dev-Helpr Bot'

/** HANDLE REQUESTS FOR STATIC FILES **/
app.use(express.static(path.resolve(__dirname, "../client/stylesheets/styles.css")));

/** REQUIRE ROUTERS **/
const usersRouter = require(path.resolve(__dirname, "./routes/users"));
const ticketsRouter = require(path.resolve(__dirname, "./routes/tickets"));
const refreshAccess = require("./routes/refresh");

/** HANDLE PARSING REQUEST BODY FOR JSON AND URL **/
//can create a cors function later to only allow certain origins (domains) to access our apps backend
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/** DEFINE ROUTE HANDLERS **/
app.use("/api/users/", usersRouter);
//create a (GET) refresh route here or in usersRouter ?
app.use("/api/refresh", refreshAccess);
app.use(protect); //user will need to be logged in to access any route below this point
app.use("/api/tickets/", ticketsRouter);

/** ROUTE HANDLER TO RESPOND WITH MAIN APP **/
app.get("/", (request, response) => {
  return response.sendFile(path.resolve(__dirname, "../client/index.html"));
});

/** CATCH-ALL ROUTE HANDLER FOR ANY REQUESTS TO AN UNKNOWN ROUTE **/
app.use("*", (request, response) => {
  response.status(404).send("Error: Page not found");
});

/** CONFIGURE EXPRESS GLOBAL ERROR HANDLER **/
app.use((error, request, response, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error", // testing
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign(defaultErr, { error: error });
  response.status(errorObj.status).json(errorObj.message.err);
});

/** RUN WEBSOCKET WHEN CLIENT CONNECTS TO CHATBOX **/
io.on('connection', (socket) => {
  /* RUNS WHEN CLIENT CONNECTS */
  console.log('user has connected to server...');
  socket.emit('connection', 'this is a message from the server...');
  socket.on('client response', (socket) => {
    console.log(socket);
  })

  /* RUNS WHEN CLIENT DISCONNECTS */
  socket.on('disconnect', () => {
    console.log('user has disconnected...');
  });

  /* JOIN USER INTO ASSIGNED ROOM */
  socket.on('joinRoom', ({ username, room }) => {
    console.log(`${username} has joined room ${room}...`);

    /* user PARAMS WILL BE (socket.id, username, room) */
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

      /* SEND USERS AND ROOM INFO  --> TWO ARGUMENTS ARE EMITTED, LISTEN FOR AN OBJECT WITH 2, NOT 3! */
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

/** START THE SERVER AND LISTEN FOR CLIENT REQUESTS **/
server.listen(PORT, () => {
  console.log(`Server connected: listening on port ${PORT}`);
});

module.exports = app;
