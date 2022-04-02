import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chatbox from "./components/Chatbox";
import Signup from './pages/signup'
import Login from './pages/login'
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss'


/** MAIN APP LIVES HERE */
function App() {

  return (
    <div className="App">
      <Chatbox />
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
        </Routes>
    </div>
  )
}

export default App;