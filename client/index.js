import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App.jsx";
import './stylesheets/styles.css';
import './stylesheets/signup.css'
import './stylesheets/login.css'



render(
  <BrowserRouter>
  <Provider store={store}>
      <App />
  </Provider>
    </BrowserRouter>,
  document.getElementById("root")
);
