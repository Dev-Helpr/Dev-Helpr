import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import axios from 'axios'
import click1 from '../audioclips/click1.mp3';

function Login({ userInput, props }) {
  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    userInput(e);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log({email: props.email});
  }
  return (
    <div>
        <div className="photo">
        <div className="fade-in-image1">
          <h1>Dev-Helpr</h1>
        </div>
      {/* <Link to="/signup">hello</Link> */}

      <input name="email" className ="emailField" type="text" placeholder="email" onChange={handleChange}/>

      <input name="password" type="password" onChange={handleChange} />

      <button type="submit" onClick={handleClick}>Submit</button>

    
    </div>
    </div>
  );
}

export default Login;
