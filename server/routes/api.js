const path = require('path');
const express = require('express');

const router = express.Router();
const controller = require('../controllers/testController');

/** STARTER DATA REQUEST ROUTE HANDLER */
// TRYING TO GET THE EXPRESS ROUTING ARCHITECTURE FUNCTIONAL

// router.get('/', (request, response) => {
//   console.log('root path accessed');
//   return response.sendFile(path.resolve(__dirname, '../../client/pages/homepage.html'));
// });


// router.get('api/chat.html', (request, response) => {
//   // console.log('chat path accessed');
//   response.sendFile(path.resolve(__dirname, '../../client/pages.html'));
//   next();
// });

router.get('/', controller.testFunction, (request, response) => {
  return response.status(200).json({ error: null })
});




module.exports = router;