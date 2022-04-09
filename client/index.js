import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App.jsx";
import Home from './pages/home'; // NOT USING ON INDEX.JS
import Login from './pages/login'; // NOT USING ON INDEX.JS
import Chatbox from "./components/Chatbox.jsx";
import 'bootstrap';
import 'react-bootstrap/dist/react-bootstrap'
import './stylesheets/chatbox.css';
import '../node_modules/socket.io-client/dist/socket.io.min.js';
import '../node_modules/socket.io/client-dist/socket.io.js';
import './stylesheets/signup.css';
import './stylesheets/login.css';

render(
  <BrowserRouter>
    <Provider store={store}>
      {/*<Chatbox/>*/}
      {/*<App />*/}
      <Home/>
      {/*<Login/>*/}
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
