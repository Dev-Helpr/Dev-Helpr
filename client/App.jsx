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
  id: state.users.id,
  userName: state.users.userName,
  email: state.users.email,
  password: state.users.password,
  ionline: state.users.online,
  status: state.users.status,
  accessToken: state.users.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
  // create functions that will dispatch action creators
  userInput: (e) => dispatch(actions.userInput(e)),
  logIn: (obj) => dispatch(actions.userLogin(obj)),
  clearInput: () => dispatch(actions.clearUserInput()),
});


function App(props) {
  console.log(props);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<Login props={props} userInput={props.userInput} />}
        />
        <Route
          path="/"
          element={<Signup props={props} userInput={props.userInput} />}
        />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
