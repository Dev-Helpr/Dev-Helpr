const path = require('path');
const express = require('express');

const router = express.Router();
const controller = require('../controllers/testController');

/** STARTER DATA REQUEST ROUTE HANDLER */
router.get('/', controller.testFunction, (request, response) => {
  console.log(request);
  return response.status(200).json({ error: null })
});


module.exports = router;