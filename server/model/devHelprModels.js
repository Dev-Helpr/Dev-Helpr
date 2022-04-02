import pg from 'pg';
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.ELEPHANTSQL_URL || 'postgres://postgres:5432@localhost/postgres'
});

module.exports = {
    query: (text, params, callback) => {
        console.log('execute query', text);
        return pool.query(text, params, callback);
    }
};