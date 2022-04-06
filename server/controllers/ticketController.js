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
        console.log('TICKET LIST:  ', ticketList.rows)
        //return an array of objects(tickets)
        return res.status(200).json(ticketList.rows)
    } catch (error) {
        return res.status(500).json({ 'message': err.message })
    }

}

const handleGetTicket = async ( req, res ) => {
    //should prob refactor to use ticket's _id and req.params.id if time in future
    try {
        const { user_id } = req.body;
        const text = 'SELECT * FROM Tickets WHERE Tickets.user_id = $1;'
        values = [user_id];
        const ticket = await db.query(text, values);
        // console.log('RETURN 1 TICKET:  ', ticket.rows[0])

        //return an object (ticket)
        return res.status(200).json(ticket.rows[0])

    } catch (error) {
        return res.status(500).json({ 'message': err.message })
    }
}

const handleDeleteTicket = async ( req, res ) => {
    //pull down user's tickets.
    //aquire tickets._id that user wants to delete
        //make sure that the ticket to be deleted has the same users's id on both ticket and in req.user
    const userID = req.user._id;
    const ticketID = req.body._id;
    const text = 'SELECT * FROM Tickets WHERE Tickets.user_id = $1;'
    values = [userID];
    const ticket = await db.query(text, values);
    console.log('TICKET ITEM:  ', ticket.rows[0])
    //check ticket ID on ticket in DB vs the ticket ID on the req body
    if (ticket.rows[0]._id === ticketID){

    

    try {
        
        console.log('REQ.USERINFO:   inside delete: ', req.user)
        res.sendStatus(200)
    } catch (error) {
        return res.status(500).json({ 'message': err.message })
    }
    }
}

module.exports = { handleNewTicket, handleGetTicketList, handleGetTicket, handleDeleteTicket }