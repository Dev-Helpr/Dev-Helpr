const express = require('express');
const router = express.Router();
const { handleRefreshToken, protect } = require('../controllers/authControllers')
//just temp middleware for testing access/auth
router.get('/refresh', handleRefreshToken);
module.exports = router;