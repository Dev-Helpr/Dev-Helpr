const path = require('path');
const express = require('express');

const router = express.Router();
const controller = require('../controllers/testController');

const messages = [
  { name:"Tim", message:"yo" },
  { name:"Pam", message:"hi" }
]

const getMessages = () => {
  return messages;
}

router.get('/', (req, res, next) => {
  res.json(getMessages());
  return next();
})

/** STARTER DATA REQUEST ROUTE HANDLER */
router.get('/', controller.testFunction, (request, response) => {
  return response.status(200).json({ error: null })
});


module.exports = router;