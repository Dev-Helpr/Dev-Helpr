import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup'
import Login from './pages/login'
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss'

const messages = [];

/** MAIN APP LIVES HERE */
function App() {

  <div className="App">
      <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
      </Routes>
  </div>
}

export default App;