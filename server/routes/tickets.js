const express = require('express');
const router = express.Router();
const { handleNewTicket, handleGetTicketList, handleGetTicket } = require('../controllers/ticketController')

router.post('/', handleNewTicket);

router.get('/list', handleGetTicketList);

router.get('/ticket', handleGetTicket);



//just temp middleware for testing access/auth
router.get('/test', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log( 'HERE IS THE AUTH TOKEN THAT GOT PAST PROTECT:  ', token);
    res.status(200).send({ "message": "auth token in header alone works!"})
});
module.exports = router;