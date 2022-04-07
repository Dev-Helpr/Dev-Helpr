import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import click1 from "../audioclips/click1.mp3";

function Signup({ userInput, userName, email, password, logIn }) {
  // if login is true, it will reroute user to home
  const [login, setLogin] = useState(false);
  //setError is used inside handleSubmit after the backend response with an error message
  const [error, setError] = useState({ isError: false, errorMessage: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users", {
        userName: userName,
        email: email,
        password: password,
      })
      .then((res) => {
        //if login successfuly
        console.log(res.data);
        if (typeof res.data === "object") {
          setLogin(true);
          logIn(res.data);
        } else {
          setError({ isError: true, errorMessage: res.data });
        }
      })
      .catch((err) => console.log(err));
  };

  const clickAudio = () => {
    return new Audio(click1).play();
  };
  if (login) {
    return <Navigate to="/home" />;
  }
  return (
    <div>
      <div className="signup-photo">
        <div className="signup-fade-in-image1">
          <h1 className="signup-h1">Dev-Helpr</h1>
        </div>
        <div className="signup-styledFormWrapper">
          <div className="form-box">
            <Link
              to="/login"
              className="signup-Button"
              onClick={() => {
                clickAudio();
              }}
            >
              <a>Please Login</a>
            </Link>
            <form method="POST" action="/signup" onSubmit={handleSubmit}>
              <input
                onChange={userInput}
                className="form-username"
                name="userName"
                type="text"
                required
                placeholder="Username:"
              ></input>
              <input
                onChange={userInput}
                className="form-email"
                name="email"
                type="email"
                required
                placeholder="Email:"
              ></input>
              <input
                onChange={userInput}
                className="form-password"
                name="password"
                type="password"
                required
                placeholder="Password:"
              ></input>
              <button
                onClick={() => {
                  clickAudio();
                }}
                className="form-createUserButton"
                type="submit"
              >
                Submit
              </button>
              {login === true ? (
                <div className="signup-signupSuccess">
                  You have successfully signed up! Welcome
                </div>
              ) : null}
              {error.isError === true ? (
                <div className="signupUnsuccess">{error.errorMessage}</div>
              ) : null}
            </form>
          </div>
        </div>
        <div className="signup-fade-in-image2">
          <h3 className="signup-h3">Connecting Developers across the globe</h3>
        </div>
      </div>
    </div>
  );
}

export default Signup;
