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
  userName: state.users.userName,
  email: state.users.email,
  password: state.users.password,
  ionline: state.users.online,
  status: state.users.status,
});

const mapDispatchToProps = (dispatch) => ({
  // create functions that will dispatch action creators
  userInput: (e) => dispatch(actions.userInput(e)),
  logIn: (e) => dispatch(actions.userLogin(e)),
});

/** MAIN APP LIVES HERE email={email} password={password} logIn={logIn}*/
function App(props) {
  console.log(props);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              props={props}
              userInput={props.userInput}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              userInput={props.userInput}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
