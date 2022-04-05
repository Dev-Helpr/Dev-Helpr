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

  const clickAudio = () => {
    return new Audio(click1).play();
  };


  return (
    <div>
    
      <div className="login-photo">
        <div className="login-fade-in-image1">
          <h1 className="login-h1">Dev-Helpr</h1>
        </div>
        <div className="login-styledFormWrapper"></div>
        <div className="form-box">
          <form>
          <input 
            name="email" 
            className ="form-email" 
            type="text" 
            placeholder="email" 
            onChange={handleChange}
          />

          <input 
            className ="form-password" 
            name="password" 
            type="password" 
            onChange={handleChange} 
          />

          </form>

          <button 
            className="form-createUserButton" 
            type="submit" 
            onClick={() => {clickAudio()}}>Login
          </button>

          </div>

          <div className="signup-fade-in-image2">
          <h3 className="signup-h3">Connecting Developers across the globe</h3>
        </div>
      </div>
    </div>

    
  );
}

export default Login;
