const mysql = require('mysql2');

// Create a connection
const pool = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '744826786',
    database: 'quickcom',
    multipleStatements: true
});

// Connect to the database
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected as id ' + pool.threadId);
});

// Export the connection for use in other modules
module.exports = pool;
