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

module.exports = { handleNewTicket, handleGetTicketList, handleGetTicket }