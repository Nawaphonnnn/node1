import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bookstore_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
// https://github.com/gotanel1/node-101
// Test connection
try {
  const connection = await pool.getConnection();
  console.log('Successfully connected to MySQL database: ' + (process.env.DB_NAME || 'bookstore_db'));
  connection.release();
} catch (error) {
  console.error('Database connection failed! Error details:', error.message);
}

export default pool;
