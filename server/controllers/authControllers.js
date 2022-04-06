require('dotenv').config();
const db = require('../model/devHelprModels');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('./userController')

const protect = async (req, res, next) => {
    let token;
    const text = 'SELECT users._id, users.username, users.email FROM users WHERE users._id = $1;';

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    
        try {
            // Get token from req header
        // .split here will turn the header: 'Bearer <token>' into an array, where bearer is 0 index and <token> is index 1, so we select ind 1 to grab the token
        token = req.headers.authorization.split(' ')[1];
            //verify token - this will also decode our JWT and we can access the users _id that we passed in when generating our access token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            //get user from token
        const value = [decoded.id];
            //here we are storing our users._id, username and email in the req.user obj that we can access within other routes
        const userInfo = await db.query(text, value);
        req.user = userInfo.rows[0]
        // console.log(req.user);
        return next();
        } catch (error) {
        console.log(error);
        //changed 401 to 200 for now due to bug
        res.status(200);
        throw new Error('Not authorized')
        }
    }
    if(!token) {
        //changed 401 to 200 for now due to bug
        res.status(200);
        throw new Error('Not authorized')
    }
}

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    //check if cookies exist? if yest check to see if .jwt property exists on cookies, if that does not exist then respond with 401 unauthorized
    if (!cookies?.jwt) return res.sendStatus(401);
        // console.log('COOKIES.JWT:  ', cookies.jwt);
    try {
        const refreshToken = cookies.jwt;
        //check if user has non-expired refresh token - query user by refreshToken value in cookies
            //if query fails (user's cookies and db token do not match) send status 403
            //- user gets new refresh token in cookies and in db by going back and sign in again
        const text = `SELECT users.username, users._id FROM users WHERE users.refreshToken = $1;`;
        const values = [cookies.jwt];
        
        const refreshTokenValidation = await db.query(text, values);
        //if successful in query, the queries rows.length will be greater than 0, if 0 (or falsy) it means refresh token has expired or does not match the token in DB, and user needs to sign in again to generate matching tokens in cookies and in DB
        
        // console.log('QUERY RETURN FOR REFRESH TOKEN in length:   ', refreshTokenValidation.rows.length)
        if (!refreshTokenValidation.rows.length) return res.sendStatus(403);

        const decodedRT = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECTRET);
        //checking if user's id retrieve from DB matches the DB within the decoded refresh token - a security measure against token tampering
        if (refreshTokenValidation.rows[0]._id !== decodedRT.id) return res.sendStatus(403);
        //now that everything is verified - create a new Access Token and send back in res
        const accessToken = generateAccessToken(refreshTokenValidation.rows[0]._id);
        return res.send({ accessToken })
    } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Not authorized')
    }

   
}

module.exports = { protect, handleRefreshToken};