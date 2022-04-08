import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import ReactDOM from "react-dom";
import axios from "axios";
import click1 from "../audioclips/click1.mp3";

function Login({ userInput, email, password, logIn }) {
  const [signIn, setSignIn] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: "" });

  const clickAudio = () => new Audio(click1).play();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/signIn", {
        email: email,
        password: password,
      })
      .then((res) => {
        //if login successfuly
        if (typeof res.data === "object") {
          console.log(res.data);
          logIn(res.data);
          setSignIn(true);
        } else {
          //if not
          setError({ isError: true, errorMessage: res.data });
          setSignIn(false);
        }
      })
      .catch((err) => console.log(err));
  };

  if (signIn) {
    return <Navigate to="/home" />;
  }
  return (
    <div>
      <div className="login-photo">
        <div className="login-fade-in-image1">
          <h1 className="login-h1">Dev-Helpr</h1>
        </div>
        <div className="login-styledFormWrapper"></div>
        <div className="form-box-2">
          <h2 className="login-Button">Login Below</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              className="form-email-2"
              type="text"
              placeholder="email"
              onChange={userInput}
            />

            <input
              className="form-password-2"
              name="password"
              type="password"
              onChange={userInput}
            />
            <button
              className="form-createUserButton-2"
              type="submit"
              onClick={() => {
                clickAudio();
              }}
            >
              Login
            </button>
          </form>
        </div>
        {error.isError ? (
          <div className="logIn__error">Either email or password is wrong</div>
        ) : null}
        <div className="login-fade-in-image2">
          <h3 className="login-h3">Connecting Developers across the globe</h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
