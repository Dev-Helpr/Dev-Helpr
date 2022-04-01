import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Login({ email, password, logIn }) {

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    logIn(e);
  }
  console.log(email)
  return (
    <div>
      {/* <input type="email" placeholder="Email" onChange={handleChange} /> */}
      {/* <form action="/login" onChange={(e) => console.log("please work")}> */}

      <input
        name="email"
        type="text"
        placeholder="email"
        onChange={handleChange}
      />
      <input name="password" type="password" onChange={handleChange} />
      <button>
        <input type="submit" value="Login User" />
      </button>
      {/*</form>*/}
    </div>
  );
}

export default Login;
