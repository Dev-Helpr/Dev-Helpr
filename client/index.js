import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App.jsx";
import 'bootstrap';
import 'react-bootstrap/dist/react-bootstrap'
import './stylesheets/chatbox.css';
import './stylesheets/signup.css';
import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css";

render(
  <BrowserRouter>
  <Provider store={store}>
      <App />
  </Provider>
    </BrowserRouter>,
  document.getElementById("root")
);
