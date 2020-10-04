const { Pool } = require('pg');
const { DATABASE_URL } = require('../config/config')

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect();

console.log('Connecting to db . . . . .')

module.exports = {
    query: async (text, params, callback) => {
        return pool.query(text, params, (callback))
    }
}