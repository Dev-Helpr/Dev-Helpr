import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./actions/action.js";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
// import "./stylesheets/styles.css";
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

// TODO: ADD AND ALIGN CHATBOX COMPONENT TO MAIN APP
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