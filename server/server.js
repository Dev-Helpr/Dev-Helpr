<<<<<<< HEAD
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('../utils/messages.js');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('../utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3031;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const { protect } = require('./controllers/authControllers');


const botName = 'Dev-Helpr Bot';

/** HANDLE REQUESTS FOR STATIC FILES */
app.use(express.static(path.resolve(__dirname, '../client')));


/** REQUIRE ROUTERS */
const usersRouter = require(path.resolve(__dirname, './routes/users'));
const ticketsRouter = require(path.resolve(__dirname, './routes/tickets'));
const refreshAccess = require('./routes/refresh')

=======
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3030;
const { protect } = require("./controllers/authControllers");
/** REQUIRE ROUTERS */
const usersRouter = require(path.resolve(__dirname, "./routes/users"));
const ticketsRouter = require(path.resolve(__dirname, "./routes/tickets"));
const refreshAccess = require("./routes/refresh");
>>>>>>> 54d4f724e4f173b641bba437b9aba985b51a96d4
/** HANDLE PARSING REQUEST BODY FOR JSON AND URL */
//can create a cors function later to only allow certain origins (domains) to access our apps backend
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/** REQUIRE ROUTERS */
const apiRouter = require(path.resolve(__dirname, './routes/api.js'));
const { options } = require("pg/lib/defaults");

/** HANDLE REQUESTS FOR STATIC FILES */
<<<<<<< HEAD
app.use(express.static(path.resolve(__dirname, '../client/stylesheets/styles.css')));
=======
app.use(
  express.static(path.resolve(__dirname, "../client/stylesheets/styles.css"))
);
>>>>>>> 54d4f724e4f173b641bba437b9aba985b51a96d4

/** DEFINE ROUTE HANDLERS */
app.use("/api/users/", usersRouter);
//create a (GET) refresh route here or in usersRouter ?
app.use("/api/refresh", refreshAccess);
app.use(protect); //user will need to be logged in to access any route below this point
app.use("/api/tickets/", ticketsRouter);

<<<<<<< HEAD
// DO NOT NEED THIS ANYMORE AS WEBPACK SERVES THE INDEX.HTML FILE ON STARTUP
// /** ROUTE HANDLER TO RESPOND WITH MAIN APP */
// app.get('/', (request, response) => {
//   return response.sendFile(path.resolve(__dirname, '../client/index.html'));
// });
=======
/** ROUTE HANDLER TO RESPOND WITH MAIN APP */
app.get("/", (request, response) => {
  return response.sendFile(path.resolve(__dirname, "../client/index.html"));
});
>>>>>>> 54d4f724e4f173b641bba437b9aba985b51a96d4

/** CATCH-ALL ROUTE HANDLER FOR ANY REQUESTS TO AN UNKNOWN ROUTE */
app.use("*", (request, response) => {
  response.status(404).send("Error: Page not found");
});

/** CONFIGURE EXPRESS GLOBAL ERROR HANDLER */
app.use((error, request, response, next) => {
  const defaultErr = {
<<<<<<< HEAD
    log: 'Express error handler caught unknown middleware error',
=======
    log: "Express error handler caught unknown middleware error", // testing
>>>>>>> 54d4f724e4f173b641bba437b9aba985b51a96d4
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign(defaultErr, { error: error });
  response.status(errorObj.status).json(errorObj.message.err);
});

/** START SERVER */
app.listen(PORT, () => {
  console.log(`Server connected: listening on port ${PORT}.`);
});

/** RUN WEBSOCKET WHEN CLIENT CONNECTS TO CHATROOM */
io.on('connection', socket => {
  console.log('user has connected...')
  socket.on('joinRoom', ({ username, room }) => {
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


module.exports = app;
