
const bcrypt = require('bcrypt');
const jwt

const handleNewUser = async (req, res) => {
    const { userName, email, pwd } = req.body;
    if (!email || !pwd || !userName) return res.status(400).json({ 'message': 'please include all required fields'});
    //check if email is already registered in DB
        // * DB QUERY HERE*
        //pull list of users from db, see if an db.user.email === email (from our req body)

        //if email already in db, return res.status(409).send('that email is already registered to an existing account')

        try {
            //encrypt the password with bcrypt and salt 10
            const hashedPwd = await bcrypt.hash(pwd, 10);
            //store the new user into DB
                // * DB QUERY HERE *
            res.status(201).json({ 'success': `New user ${userName} created.`})
        } catch (err) {
            res.status(500).json({ 'message': err.message })
        }
}

module.exports = { handleNewUser };
