import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from 'axios'
import click1 from '../audioclips/click1.mp3';


function Signup({ userInput, props }) {
  // // State for checking error
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [toggle1, setToggle1] = useState(false);

  // Function for username change
  const handleChange = (e) => {
    userInput(e);
    setSubmitted(false);
  };

  // Function for submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api", {
      userName: props.userName,
      email: props.email,
      password: props.password,
    }).then(res => {
        console.log(res);
    });
      setSubmitted(true);
      setToggle1(true);
      setError(false);
    console.log(e.target.value);
    console.log("Submitted:", error);
  };

  const handleToggle1 = () => {
    setToggle1(!toggle1);
    console.log(toggle1);
  };

  const clickAudio = () => {
    return new Audio(click1).play();
  };

  return (
    <div>
      <div className="signup-photo">
        <div className="signup-fade-in-image1">
          <h1 className="signup-h1">Dev-Helpr</h1>
        </div>
        <div className="signup-styledFormWrapper">
          <div className="form-box">
          <Link to="/login" className="signup-Button" onClick={() => {clickAudio()}}><a>Please Login</a></Link>
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
                onClick={() => {handleToggle1; clickAudio()}}
                className="form-createUserButton"
                type="submit"
              >
                Submit
              </button>
              {toggle1 == true ? (
                <div className="signup-signupSuccess">
                  You have successfully signed up! Welcome
                </div>
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

// Idea for the backend - query for signup
// app.post("/signup", (req, res) => {
//     db.query(
//         "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
//         [username, email, password],
//         (err, result) => {
//             console.log(err);
//         }
//     )
//     })

// app.post("/signup", (req, res) => {
//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;
// })
