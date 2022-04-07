const express = require('express');
const router = express.Router();
const { handleNewUser, userExistsInDB, handleSignIn, handleLogOut, handleGetUserList, handleChangeUserStatus, } = require('../controllers/userController');
const { protect } = require('../controllers/authControllers');

// inside route @ '/api/users/'

// Create new user in database
router.route('/')
    .post(userExistsInDB, handleNewUser)
    .get(handleGetUserList)

//log in user 
router.post('/signIn', userExistsInDB, handleSignIn);

//get user info - need to be logged in
router.route('/:id')
    .put(protect, handleChangeUserStatus)


router.get('/info', protect, (req, res) => {
    // res.cookie (JWT auth)
    const userInfo = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.username
    }
    res.status(200).json(userInfo)
})

router.get('/logout', handleLogOut);

module.exports = router; 