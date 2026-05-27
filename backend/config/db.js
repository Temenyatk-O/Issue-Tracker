const path  = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = mysql.createPool({
  host:            process.env.DB_HOST,
  port:            process.env.DB_PORT || 3306,
  user:            process.env.DB_USER,
  password:        process.env.DB_PASSWORD ?? '',
  database:        process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,        
  queueLimit:      0,        
});


pool.getConnection()
  .then(conn => {
    console.log('✅  MySQL connected successfully');
    conn.release();
  })
  .catch(err => {
    console.error('❌  MySQL connection failed:', err.message);
    console.error('    Check DB_HOST, DB_USER, DB_PASSWORD, DB_NAME in your .env file');
  });

module.exports = pool;
