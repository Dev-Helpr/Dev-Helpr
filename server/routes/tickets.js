const express = require('express');
const router = express.Router();
const { protect } = require('../controllers/authControllers');
const { handleNewTicket, handleGetTicketList, handleGetTicket, handleDeleteTicket, handleUpdateTicket } = require('../controllers/ticketController')

//inside @ '/api/tickets/'

router.post('/', protect, handleNewTicket);

router.get('/list', protect, handleGetTicketList);

router.route('/:id')
    .get(protect, handleGetTicket)
    .put(protect, handleUpdateTicket)
    .delete(protect, handleDeleteTicket)




module.exports = router;