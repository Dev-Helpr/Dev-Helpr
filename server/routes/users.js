const express = require('express');
const router = express.Router();

// Create new user in database
router.post('/', (req, res) => {
    // res.cookie (JWT auth)
    res.status(200).json({ message: 'Creating new user' })
});

router.post('/signIn', (req, res) => {
    // res.cookie (JWT auth)
    res.status(200).json({ message: 'logging in user' })
})

router.get('/info', (req, res) => {
    // res.cookie (JWT auth)
    res.status(200).json({ message: 'getting account info' })
})