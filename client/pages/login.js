import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import ReactDOM from "react-dom";
import axios from "axios";
import click1 from "../audioclips/click1.mp3";

function Login({ userInput, props }) {
  const [signIn, setSignIn] = useState(false);
  const [error, setError] = useState({isError: false, errorMessage: ''});

  const handleChange = (e) => userInput(e);

  const clickAudio = () => new Audio(click1).play();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/signIn", {
        email: props.email,
        password: props.password,
      })
      .then((res) => {
        //if login successfuly
        console.log(res);
        if (typeof res.data === 'object') {
          props.logIn(res.data);
          setSignIn((prev) => !prev);
        } else {
          setError({ isError: true, errorMessage: res.data });
        }
      });
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
              onChange={handleChange}
            />

            <input
              className="form-password-2"
              name="password"
              type="password"
              onChange={handleChange}
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
