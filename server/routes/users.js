const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../controllers/authControllers');

// inside route @ '/api/users/'

// Create new user in database
router.post('/', userController.userExistsInDB, userController.handleNewUser);

//log in user 
router.post('/signIn', userController.userExistsInDB, userController.handleSignIn);

//get user info - need to be logged in
router.get('/info', protect, (req, res) => {
    // res.cookie (JWT auth)
    const userInfo = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.username
    }
    res.status(200).json(userInfo)
})

router.get('/logout', userController.handleLogOut);

module.exports = router; 