require('dotenv').config();
const db = require('../model/devHelprModels');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;
    const text = 'SELECT users._id, users.username, users.email FROM users WHERE users._id = $1;';

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    
        try {
            // Get token from req header
        // .split here will turn the header: 'Bearer <token>' into an array, where bearer is 0 index and <token> is index 1, so we select ind 1 to grab the token
        token = req.headers.authorization.split(' ')[1];
            //verify token - this will also decode our JWT and we can access the users _id that we passed in when generating our access token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            //get user from token
        const value = [decoded.id];
            //here we are storing our users._id, username and email in the req.user obj that we can access within other routes
        const userInfo = await db.query(text, value);
        req.user = userInfo.rows[0]
        console.log(req.user);
        return next();
        } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Not authorized')
        }
    }
    if(!token) {
        res.status(401);
        throw new Error('Not authorized')
    }
}

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    //check if cookies exist? if yest check to see if .jwt property exists on cookies, if that does not exist then respond with 401 unauthorized
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

   
}

module.exports = { protect };