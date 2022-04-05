import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
// import click1 from '../audioclips/click1.mp3';

function Signup({ userInput, props }) {
  // // State for checking error
  const [error, setError] = useState(false);
  const [login, setLogin] = useState(false);
  const [toggle1, setToggle1] = useState(false);

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
        //if signup successfully, res.data = true
        //if not, res.data = false
        if (res.data) {
          setLogin(true);
          setError(false);
        } else {
          setLogin(false);
          setError(true);
        }
      });
    setToggle1(true);

    console.log(e.target.value);
  };

  const clickAudio = () => {
    return new Audio(click1).play();
  };

  return (
    <div>
      <div className="photo">
        <div className="fade-in-image1">
          <h1>Dev-Helpr</h1>
        </div>
        <div className="styledFormWrapper">
          <div className="form-box">
            <Link to="/login">
              <button className="signupButton">Please Login:</button>
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
              <button className="form-createUserButton" type="submit">
                Submit
              </button>
              {login === true ? (
                <div className="signupSuccess">
                  You have successfully signed up! Welcome
                </div>
              ) : null}
              {error === true ? (
                <div className="signupUnsuccess">
                  This user is already exist
                </div>
              ) : null}
            </form>
          </div>
        </div>
        <div className="fade-in-image2">
          <h3 className='footer'>Connecting Developers across the globe</h3>
        </div>
      </div>
    </div>
  );
}

export default Signup;
