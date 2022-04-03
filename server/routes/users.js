const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const userController = require('../controllers/userController');

// inside route @ '/api/users/'

// Create new user in database
router.post('/', userController.userExistsInDB, userController.handleNewUser);

//log in user 
router.post('/signIn', userController.userExistsInDB, userController.handleSignIn);

//get user info
router.get('/info', (req, res) => {
    // res.cookie (JWT auth)
    res.status(200).json({ message: 'getting account info' })
})

//test
router.get('/test', testController.testGetDB, (req, res) => {
    console.log('HERE IS USER LIST FROM DB:  ',res.locals.userList)
    res.status(200).json(res.locals.userList);
})
module.exports = router; 