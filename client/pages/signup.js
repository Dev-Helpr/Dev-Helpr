import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Signup({ userInput }) {
  const handleChange = (e) => {
    userInput(e);
  };
  return (
    <div>
      <form method="POST" action="/signup">
        <input
          name="userName"
          type="text"
          placeholder="username"
          onChange={handleChange}
        ></input>
        <input
          name="email"
          type="text"
          placeholder="email"
          onChange={handleChange}
        ></input>
        <input name="password" type="password" onChange={handleChange}></input>
        <input name="confirm password" type="confirm password"></input>
        <button>
          <input type="submit" value="Create User" />
        </button>
      </form>
    </div>
  );
}

export default Signup;