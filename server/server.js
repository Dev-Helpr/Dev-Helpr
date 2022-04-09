const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const app = express();
app.use(cors());

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8084",
    methods: ["GET", "POST"],
  },
});

const PORT = 3030;

// console.log('io: ',io)
const { protect } = require("./controllers/authControllers");
/** REQUIRE ROUTERS */
const usersRouter = require(path.resolve(__dirname, "./routes/users"));
const ticketsRouter = require(path.resolve(__dirname, "./routes/tickets"));
const refreshAccess = require("./routes/refresh");
/** HANDLE PARSING REQUEST BODY FOR JSON AND URL */
//can create a cors function later to only allow certain origins (domains) to access our apps backend
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/** HANDLE REQUESTS FOR STATIC FILES */
app.use(
  express.static(path.resolve(__dirname, "../client/stylesheets/styles.css"))
);

/** DEFINE ROUTE HANDLERS */
app.use("/api/users/", usersRouter);
//create a (GET) refresh route here or in usersRouter ?
app.use("/api/refresh", refreshAccess);
// app.use(protect); //user will need to be logged in to access any route below this point
app.use("/api/tickets/", ticketsRouter);

/** ROUTE HANDLER TO RESPOND WITH MAIN APP */
app.get("/", (request, response) => {
  return response.sendFile(path.resolve(__dirname, "../client/index.html"));
});

/** CATCH-ALL ROUTE HANDLER FOR ANY REQUESTS TO AN UNKNOWN ROUTE */
app.use("*", (request, response) => {
  response.status(404).send("Error: Page not found");
});

/** CONFIGURE EXPRESS GLOBAL ERROR HANDLER */
app.use((error, request, response, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error", // testing
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign(defaultErr, { error: error });
  response.status(errorObj.status).json(errorObj.message.err);
});

// SOCKET.IO

io.on("connection", (socket) => {
  console.log(`User ID: ${socket.id} is connected...`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data)
  })
});
/** START SERVER */
server.listen(3031, () => {
  console.log("SOCKET.IO SERVER IS RUNNING ON 3031")
});
app.listen(PORT, () => {
  console.log(`Server connected -- listening on port ${PORT}`);
});



module.exports = app;



// async function isValidJwt(token){
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
//       if (err){
//           console.log(err);
//           return false;
//       }else{
//           //console.log(decoded);
//           return true;
//       }
//   });
// }

// io.use((socket, next) => {
//    token = socket.handshake.auth.token;
//   if (isValidJwt(token)){
//       return next();
//   }else{
//       return next(new Error("Socket authentication error"));
//   }
// });

