const db = require('../model/devHelprModels');
const bcrypt = require('bcrypt');

// const jwt
const userExistsInDB = async (req, res, next) => {
    const text = `SELECT * FROM Users WHERE users.email = $1`;
    const values = [req.body.email]
    //check if email is already registered in DB
    const checkIfUserExist = await db.query(text, values);
        console.log(' OUR DB OUTPUT AFTER CHECKING IF EMAIL EXISTS:  ',checkIfUserExist.rows)
        //if query returns a non-empty array (meaning the account was successfully queried on our database and therefore already exists) then save in res.locals.existingUser as true
        console.log('length:  ',checkIfUserExist.rows.length)
         if (checkIfUserExist.rows.length)  {
             res.locals.existingUser = true;
             console.log('res.locals.existingUser =  ', res.locals.existingUser)
             return next()
            }
         //else the query returns an empty array, then it is not already in use within our DB, therefore we should save res.locals.existingUser to false
         res.locals.existingUser = false;
         console.log('res.locals.existingUser =  ', res.locals.existingUser);
         return next();

};

const handleNewUser = async (req, res) => {
    //check if user exists in our DB already - userExistsInDB middleware should be ran before this middleware
    if (res.locals.existingUser) return res.status(400).json(false)
    
    const { userName, email, password } = req.body;
         
        try {
            //encrypt the password with bcrypt and salt 10
            const hashedPwd = await bcrypt.hash(password, 10);
            //store the new user into DB
            const text = `INSERT INTO Users (userName, email, online, status, password) VALUES ($1, $2, $3, $4, $5);`
            const values = [userName, email, true, 'neutral', hashedPwd];
            await db.query(text, values);
            
           return res.status(201).json(true)
        } catch (err) {
            return res.status(500).json({ 'message': err.message })
        }
}

module.exports = { handleNewUser, userExistsInDB };
