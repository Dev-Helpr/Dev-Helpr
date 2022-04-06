import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./action/action.js";
import Signup from "./pages/signup";
import Login from "./pages/login";



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
      </Routes>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
