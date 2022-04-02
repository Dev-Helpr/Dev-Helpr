import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
// import Axios from 'axios'
// import click1 from '../audioclips/click1.mp3';

// function Signup({ userInput }) {
//  const handleChange = (e) => {
//     userInput(e);
//   };
//   return (
//     <div>
//       <form method="POST" action="/signup">
//         <input
//           name="userName"
//           type="text"
//           placeholder="username"
//           onChange={handleChange}
//         ></input>
//         <input
//           name="email"
//           type="text"
//           placeholder="email"
//           onChange={handleChange}
//         ></input>
//         <input name="password" type="password" onChange={handleChange}></input>
//         <input name="confirm password" type="confirm password"></input>
//         <button>
//           <input type="submit" value="Create User" />
//         </button>
//       </form>
//     </div>
//   );

function Signup({ userInput }) {
  const handleChange = (e) => {
    userInput(e);
  };
  // Initial state
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // // State for checking error
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [toggle1, setToggle1] = useState(false);

  // Function for username change
  const handleUsername = (e) => {
    userInput(e);
    setSubmitted(false);
  };

  // Function for email change
  const handleEmail = (e) => {
    userInput(e);
    setSubmitted(false);
  };

  // Function for password change
  const handlePassword = (e) => {
    userInput(e);
    setSubmitted(false);
  };

  // Function for submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
    console.log(e.target.value);
    console.log("Submitted:", submitted);
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
      {/* <Link to="/login"><a>MAX ROCKS</a></Link> */}
      <div className="photo">
        <div className="fade-in-image1">
          <h1>Dev-Helpr</h1>
        </div>
        <div className="styledFormWrapper">
          <div className="form-box">
            <button className="signupButton">Please Login:</button>
            <form method="POST" action="/signup">
              <input
                onChange={handleUsername}
                className="form-username"
                name="userName"
                type="text"
                placeholder="Username:"
              ></input>
              <input
                onChange={handleEmail}
                className="form-email"
                name="email"
                type="email"
                placeholder="Email:"
              ></input>
              <input
                onChange={handlePassword}
                className="form-password"
                name="password"
                type="password"
                placeholder="Password:"
              ></input>
              <button
                onChange={handleSubmit}
                onClick={handleToggle1}
                className="form-createUserButton"
                type="button"
                value="Create User"
              >
                Submit
              </button>
              {toggle1 == true ? (
                <div className="signupSuccess">
                  You have successfully signed up! Welcome
                </div>
              ) : null}
            </form>
          </div>
        </div>
        <div className="fade-in-image2">
          <h3>Connecting Developers across the globe</h3>
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
