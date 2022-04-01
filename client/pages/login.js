import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Login() {
    return (
        <div>
            <form method='POST' action='/login'>
                <input name="username" type="text" placeholder="username"></input>
                <input name="password" type="password"></input>
                <button>
                    <input type='submit' value='Login User'/>
                </button>
            </form>
        </div>
    )
}

export default Login;