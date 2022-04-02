import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Signup from './pages/signup'
import Login from './pages/login'
import './stylesheets/styles.css';
// import ReactPlayer from "react-player";


function App() {
    
    return (
        <div className="App">
            <Routes>
                {/* <Route path='/' element={<Login/>} /> */}
                <Route path='/' element={<Signup/>} />
            </Routes>
        </div> 
    )
}

export default App;