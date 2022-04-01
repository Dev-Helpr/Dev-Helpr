import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Signup() {
    const handleChange = (e) => {
        console.log('hi');
    }
    return (
        <div>
            <form method='POST' action='/signup'>
                <input name="username" type="text" placeholder="username" onChange={handleChange}></input>
                <input name="email" type="text" placeholder="email"></input>
                <input name="password" type="password"></input>
                <input name="confirm password" type="confirm password"></input>
                <button>
                    <input type='submit' value='Create User'/>
                </button>
            </form>
        </div>
    )
}

export default Signup;