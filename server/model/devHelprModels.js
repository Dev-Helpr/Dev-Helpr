const pg = require('pg');
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.ELEPHANTSQL_URL
});


module.exports = {
    query: (text, params, callback) => {
        console.log('execute query', text);
        return pool.query(text, params, callback);
    }
};