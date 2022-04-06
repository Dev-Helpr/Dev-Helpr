import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import click1 from "../audioclips/click1.mp3";

function Signup({ userInput, props }) {
  // // State for checking error
  const [login, setLogin] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: "" });
  const handleChange = (e) => {
    userInput(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users", {
        userName: props.userName,
        email: props.email,
        password: props.password,
      })
      .then((res) => {
        //if login successfuly
        console.log(res.data);
        if (typeof res.data === "object") {
          setLogin(true);
          console.log(res.data);
          props.logIn(res.data);
        } else {
          setError({ isError: true, errorMessage: res.data });
        }
      });
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
                onChange={handleChange}
                className="form-username"
                name="userName"
                type="text"
                required
                placeholder="Username:"
              ></input>
              <input
                onChange={handleChange}
                className="form-email"
                name="email"
                type="email"
                required
                placeholder="Email:"
              ></input>
              <input
                onChange={handleChange}
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
