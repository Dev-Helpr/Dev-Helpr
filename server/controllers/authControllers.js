require('dotenv').config();
const db = require('../model/devHelprModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;
    const text = 'SELECT users._id, users.username FROM users WHERE users._id = $1;';

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    
        try {
            // Get token from req header
        // .split here will turn the header: 'Bearer <token>' into an array, where bearer is 0 index and <token> is index 1, so we select ind 1 to grab the token
        token = req.headers.authorization.split(' ')[1];
            //verify token - this will also decode our JWT and we can access the users _id that we passed in when generating our access token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            //get user from token
        const value = [decoded.id];
        console.log('HERE is the decoded user id from token:  ',value);

        req.user = await db.query(text, value)
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

module.exports = { protect };