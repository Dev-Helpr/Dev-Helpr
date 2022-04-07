const db = require('../model/devHelprModels');

// insert new habit into DB
const handleNewTicket = async (req, res, next) => {
    const { problem, tried, expect, hypothesis, urgency, inProgress, heading, ready1, ready2, user_id } = req.body;


    const text = 'INSERT INTO Tickets (problem, tried, expect, hypothesis, urgency, inProgress, heading, ready1, ready2, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);'
    const values = [ problem, tried, expect, hypothesis, urgency, false, heading, false, false, user_id ];

    await db.query(text, values);
    //will we need to return the new ticket back in res or should we just have the page make a fetch to update the entire list of tickets?
    return res.status(201).json({ 'message': 'placeholder response - successful'})
};

const handleGetTicketList = async ( req, res) => {
    try {

        const ticketList = await db.query('SELECT * FROM tickets LIMIT 30;')
        // console.log('TICKET LIST:  ', ticketList.rows)
        //return an array of objects(tickets)
        return res.status(200).json(ticketList.rows)
    } catch (error) {
        return res.status(500).json({ 'message': err.message })
    }

}

const handleGetTicket = async ( req, res ) => {
    //grab ticket id from params and use it to search database
    const text = 'SELECT * FROM Tickets WHERE Tickets._id = $1;'
    values = [req.params.id];
    const ticket = await db.query(text, values);
    if (!ticket.rows.length) {
        res.status(200).json('No matching ticket in database')
    }

    try {
        // console.log('RETURN 1 TICKET:  ', ticket.rows[0])

        //return an object (ticket)
        return res.status(200).json(ticket.rows[0])

    } catch (error) {
        return res.status(500).json({ 'message': err.message })
    }
}

const handleDeleteTicket = async ( req, res ) => {
    
    //aquire tickets._id that user wants to delete from params
        //make sure that the ticket to be deleted has the same users's id on both ticket and in req.user
    const userID = req.user._id.toString();
    const ticketID = req.params.id;
    const text = 'SELECT * FROM Tickets WHERE Tickets.user_id = $1 AND Tickets._id = $2;';
    values = [userID, ticketID];
    //check if ticket lives on database
    const ticket = await db.query(text, values);
    // console.log('ticketID from params:  ', ticketID)
    // console.log('User ID from req.user', userID)
    // console.log('TICKET ITEM:  ', ticket.rows[0])
    //check ticket ID on ticket in DB vs the ticket ID on the req body && that current logged in user id matches the user id on the ticket
    if (ticket.rows[0]._id.toString() === ticketID && ticket.rows[0].user_id === userID){

    try {
        console.log('REQ.USERINFO:   inside delete: ', req.user)
        const text2 = 'DELETE FROM Tickets WHERE Tickets.user_id = $1 AND Tickets._id = $2;';
        await db.query(text2, values);
       return res.status(200).json('You were able to delete this ticket')
    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
    }
    return res.status(200).json('You are not allowed to delete this ticket')
}

const handleUpdateTicket = async (req,res) => {
    const { problem, tried, expect, hypothesis, urgency, inProgress, heading, ready1, ready2, user_id } = req.body;

    const userID = req.user._id.toString();
    const ticketID = req.params.id;
    const text = 'SELECT * FROM Tickets WHERE Tickets.user_id = $1 AND Tickets._id = $2;';
    values = [userID, ticketID];
    //check if ticket lives on database
    const ticket = await db.query(text, values);

    if (ticket.rows[0]._id.toString() === ticketID && ticket.rows[0].user_id === userID){

        try {
            const text2 = 'UPDATE Tickets SET problem = $1, tried = $2, expect = $3, hypothesis = $4, urgency = $5, inProgress = $6, heading = $7, ready1 = $8, ready2 = $9, user_id = $10 WHERE Tickets.user_id = $11 AND Tickets._id = $12;';
            const values2 = [problem, tried, expect, hypothesis, urgency, inProgress, heading, ready1, ready2, user_id, userID, ticketID];
            const updatedTicket = await db.query(text2, values2);
            // console.log('THIS IS THE UPDATED TICKET:  ', updatedTicket);
            return res.status(200).json('You were able to update the ticket')

        } catch (error) {
            return res.status(500).json({ 'message': error.message })
        }
    }
}

module.exports = { handleNewTicket, handleGetTicketList, handleGetTicket, handleDeleteTicket, handleUpdateTicket }