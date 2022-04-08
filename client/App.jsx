import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./action/action.js";
import Signup from "./pages/signup";
import Login from "./pages/login";
<<<<<<< HEAD
import Chatbox from './components/Chatbox.jsx';
=======
import Home from "./pages/home";
// import "./stylesheets/styles.css";
>>>>>>> a97f186d062ebb9035bd55b892628a6b20419189
// import ReactPlayer from "react-player";

const mapStateToProps = (state) => ({
  //user is the whole users object
  user: state.users,
  //each value inside users object
  id: state.users.id,
  userName: state.users.userName,
  email: state.users.email,
  password: state.users.password,
  ionline: state.users.online,
  status: state.users.status,
  accessToken: state.users.accessToken,
  //ticket's state
  tickets: state.tickets,
});

const mapDispatchToProps = (dispatch) => ({
  // userInput: update users object based on user input (console.log of users obj in App component below)
  userInput: (e) => dispatch(actions.userInput(e)),
  //update users obj after receive data from backend, this func is used in both signup and log in
  logIn: (obj) => dispatch(actions.userLogin(obj)),
  //when invoke, it will convert users obj to its initial state.
  clearInput: () => dispatch(actions.clearUserInput()),
  //update ticket input
  ticketCreator: (e) => dispatch(actions.ticketCreator(e)),
  updateTicketUrgency: (e) => dispatch(actions.updateTicketUrgency(e)),
  getTicketStateWhenClickEdit: (obj) =>
    dispatch(actions.getTicketStateWhenClickEdit(obj)),
});

function App(props) {
  // console.log(props.accessToken);
  console.log('users\'s state: ', props.user);
  console.log('ticket state: ', props.tickets);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              email={props.email}
              password={props.password}
              logIn={props.logIn}
              userInput={props.userInput}
            />
          }
        />
        <Route
          path="/"
          element={
            <Signup
              userName={props.userName}
              email={props.email}
              password={props.password}
              logIn={props.logIn}
              userInput={props.userInput}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Home
              user={props.user}
              tickets={props.tickets}
              ticketCreator={props.ticketCreator}
              updateTicketUrgency={props.updateTicketUrgency}
              getTicketStateWhenClickEdit={props.getTicketStateWhenClickEdit}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
