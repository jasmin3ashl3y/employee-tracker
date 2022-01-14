const mysql = require('mysql2');
const util = require("util");
require('dotenv').config();

// Create Port
// const PORT = process.env.PORT || 3306;

// connects to database, .env for password privacy
const connection = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME, 
    },
    console.log("Connected to Employee Tracker")
);


// Check for connection errors
connection.connect(function (err) {
    if (err) {
        console.log("unable to connect")
    };
    console.log('Connected to Employee Database');
    init();
});

connection.query = util.promisify(connection.query);

module.exports = connection;