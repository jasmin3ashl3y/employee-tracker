const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Create Port
const PORT = process.env.PORT || 3306;

// Parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Connects to database + .env for password privacy
const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: process.env.DB_PASS,
        port: PORT,
        database: "employees",
        connectTimeout: 300000
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

// Init fx
function init(connection) {
    inquirer.prompt([{
    // Options to begin program
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices : [
            'View all departments', 
            'View all roles', 
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add employee',
            'Update employee role',
        ]}
    ]).then(function (userInput) {
        switch(userInput.options) {
            // Calls viewDept function
            case ('View all departments'): viewDepts();
            break;
            // Calls viewRoles function
            case ('View all roles'): viewRoles();
            break;
            // Calls viewEmployees function
            case ('View all employees'): viewEmployees();
            break;
            // Calls addDept function
            case ('Add a department'): addDept();
            break;
            // Calls addRole function
            case ('Add a role'): addRole();
            break;
            // Calls addEmployee function
            case ("Add employee"): addEmployee();
            break;
            // Calls updateEmployee function
            case ('Update employee role'): updateEmployee();
            break;
        }
    })
    
};

