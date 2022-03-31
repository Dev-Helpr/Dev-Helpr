const express = require('express');
const router = express.Router();
const controller = require('../controllers/testController');

// Create new user in database
router.post('/', controller.testFunction, (req, res) => {
    // res.cookie (JWT auth)
    res.status(200).json({ message: 'Creating new user' })
});

router.post('/signIn', controller.testFunction, (req, res) => {
    // res.cookie (JWT auth)
    res.status(200).json({ message: 'logging in user' })
})

router.get('/info', controller.testFunction, (req, res) => {
    // res.cookie (JWT auth)
    res.status(200).json({ message: 'getting account info' })
})