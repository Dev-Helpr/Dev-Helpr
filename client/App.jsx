import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./action/action.js";
import Signup from "./pages/signup";
import Login from "./pages/login";
import "./stylesheets/styles.css";

/*
 username: '',
  email: '',
  password: '',
  isOnline: false,
  ishelper: false,
*/
const mapStateToProps = (state) => ({
  username: state.users.username,
  email: state.users.email,
  password: state.users.password,
  isOnline: state.users.isOnline,
  ishelper: state.users.ishelper,
});

const mapDispatchToProps = (dispatch) => ({
  // create functions that will dispatch action creators
  signup: (e) => dispatch(actions.userSignup(e)),
  logIn: (e) => dispatch(actions.userLogin(e)),
});

/** MAIN APP LIVES HERE email={email} password={password} logIn={logIn}*/
function App(props) {
  console.log(props)
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              email={props.email}
              password={props.password}
              logIn={props.logIn}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              signup={props.signup}
              username={props.username}
              email={props.email}
              password={props.password}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
