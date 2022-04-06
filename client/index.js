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
import '../node_modules/socket.io-client/dist/socket.io.min.js';
import '../node_modules/socket.io/client-dist/socket.io.js';
import 'qs';

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
