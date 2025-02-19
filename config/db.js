const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', // or '127.0.0.1'
  user: 'root', // your MySQL username
  password: '', // your MySQL password
  database: 'paymentDB', // your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;