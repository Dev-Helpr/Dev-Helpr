const express = require('express');
const router = express.Router();
const { handleNewTicket, handleGetTicketList, handleGetTicket, handleDeleteTicket } = require('../controllers/ticketController')

router.post('/', handleNewTicket);
// ADDS TICKET TO THE TICKETSCONTAINER COMPONENT //

router.get('/list', handleGetTicketList);
// WILL RENDER LIST OF TICKETS ON TICKETSCONTAINER COMPONENT //

router.get('/ticket', handleGetTicket);
// WILL RENDER TICKET ONTO TICKETDISPLAY COMPONENT //

router.get('/del', handleDeleteTicket);
// WILL DELETE TICKET FROM TICKETSCONTAINER COMPONENT; TRIGGERED BY RESOLVING A TICKET OR USER COMMAND //


//just temp middleware for testing access/auth
router.get('/test', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log( 'HERE IS THE AUTH TOKEN THAT GOT PAST PROTECT:  ', token);
    res.status(200).send({ "message": "auth token in header alone works!"})
});
module.exports = router;