import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";

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
      <Link to="/signup">hello</Link>
      <input
        name="email"
        type="text"
        placeholder="email"
        onChange={handleChange}
      />
      <input name="password" type="password" onChange={handleChange} />
      <button type="submit" onClick={handleClick}>Submit</button>
      {/*</form>*/}
    </div>
  );
}

export default Login;
