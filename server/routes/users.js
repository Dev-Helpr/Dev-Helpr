const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create new user in database
router.post('/', userController.handleNewUser);

router.post('/signIn', (req, res) => {
    // res.cookie (JWT auth)
    res.status(200).json({ message: 'logging in user' })
})

router.get('/info', (req, res) => {
    // res.cookie (JWT auth)
    res.status(200).json({ message: 'getting account info' })
})

module.exports = router; 