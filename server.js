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
        // Added connectTimeout due to frequent ._handleTimeoutError
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
    // Prompt User w/Inquirer package
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


function viewDepts() {
    // show dept names + Ids
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) {
            console.log(err)
        };
        // Initializes main prompt function
        init();
    })
};

function viewRoles() {
    // show job title, role id, department, salary
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) {
            console.log(err)
        };
        init();
    })
};

function viewEmployees() {
    // show employee id, first name, last name, job title, department, salary, managers
    let query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
        if (err) {
            console.log(err)
        };
        init();
    })
};

function addDept() {
    // enter department name, add to db
    inquirer.prompt({
        type: "input",
        name: "departmentName",
        message: "What is the new department name?",
        // Validates that userInput is not blank
        validate: (userInput) => {
            if (userInput !== "") {
                return "Department name cannot be empty";
            } else {
        return true; 
            }
        }
    })
    .then(function (userInput) {
        // create departmentName var to insert into query
            let departmentName = userInput.departmentName;
            let query = `INSERT INTO department (department_name) VALUES ("${departmentName}")`;
            connection.query(query, (err, res) => {
                // Console logs if error occurs
                if (err) {
                    console.log(err);
                }
                // Console logs success!
                console.log(`${departmentName} has been added to departments!`);
            }
        );
        // Returns to main prompt fx
        init();
    })
};

function addRole() {
    // enter role name, salary + department then add to db
    let query1 = "SELECT * FROM department";
    connection.query(query1, (err, res) => {
        if (err) {
            console.log(err)
        }
            return inquirer.prompt([
                    {
                        type: "input",
                        name: "role",
                        message: "Enter a new role",
                        // Validate to make sure answer is not blank
                        validate: (userInput) => {
                            if (userInput !== "") {
                                return "Role ID can't be blank";
                            } else {
                        return true; 
                            }
                        }
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "Enter the salary for this role",
                         // Validate to make sure answer is numerical
                        validate: (userInput) => {
                            if (userInput === isNaN) {
                                return "Salary must be numerical";
                            } else {
                        return true; 
                            }
                        }
                    },
                    {
                        type: "list",
                        name: "department",
                        message: "What department is this role in?",
                        choices: () => {
                            let departmentArray = [];
                            // Creates an array from the department table data from the mysql query
                            for (let i = 0; i < res.length; i++) {
                            // Pushes department name & Id to array
                            departmentArray.push(res[i].department_name + " | " + res[i].id);
                    }
                    // Returns new departmentArray
                    return departmentArray;
                },
            },
        ])
        .then(function (userInput) {
            // splits dept with '|' in the middle
            let dept = userInput.department.split("|")[1];
            let query2 = `INSERT INTO role (title, department_id, salary) VALUES ("${userInput.role}", ${dept}, "${userInput.salary}") `;
            connection.query(query2, (err, res) => {
                // Console logs error
                    if (err) {
                        console.log(err)
                    }
                    console.log(`"${userInput.role}" role added successfully!`);
                    // Returns to main prompt fx
                    init();
                    }
                )
            })
        }
    )
};

function addEmployee() {
    // enter employee id, first name, last name, salary, dept, manager, add to db
    let query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            return inquirer
            .prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "Enter employee's first name",
                    // Validate to make sure answer is not blank
                    validate: (userInput) => {
                        if (userInput !== "") {
                            return true;
                        } else {
                    return "First name can't be blank";
                        }
                    }
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "Enter employee's last name",
                    // Validate to make sure answer is not blank
                    validate: (userInput) => {
                        if (userInput !== "") {
                            return true;
                        } else {
                        return "Last name can't be blank";
                        }
                    }
                },
                {
                    type: "input",
                    name: "roleId",
                    message: "Enter employee's role ID",
                    // Validate to make sure answer is number
                    validate: (userInput) => {
                        if (userInput === isNaN) {
                            return "Employee role ID must be numerical";
                        } else {
                    return true; 
                        }
                    }
                },
                {
                    type: "input",
                    name: "managerId",
                    message: "Enter employee's manager ID",
                    // Validate to make sure answer is number
                    validate: (userInput) => {
                        if (userInput === isNaN) {
                            return "Manager ID must be numerical";
                        } else {
                    return true; 
                        }
                    }
                },
            ])
            .then(function (userInput) {
                // Inserts new userInput data into employee table
                let query2 = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                connection.query(query2,
                [userInput.firstName, userInput.lastName, userInput.roleId, userInput.managerId],(err, res) => {
                        if (err) {
                            console.log (err)
                        } 
                        console.log(`${userInput.firstName} ${userInput.lastName} has been added to the team!`);
                        // Return to main prompt function
                        init();
                    }
                )
            })
        }
    })
}

function updateEmployee() {
// enter new employee role, then add to db
    let query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
        if (err) {
            console.log(err)
        };
        return (
          inquirer
            .prompt([
              {
                type: "list",
                name: "name",
                message: "Whose role are you updating?",
                // User's choices from array from employee table
                choices: () => {
                  let employeeArray = [];
                  // creates array of employees from the result of the mysql query for the employee table
                  for (let i = 0; i < res.length; i++) {
                    //   pushes first name and last name from array
                    employeeArray.push(res[i].first_name + " " + res[i].last_name);
                  }
                //   Returns new employeeArray
                  return employeeArray;
                },
              },
            ])
            .then(function (userInput) {
            // first name and last name
              let fullName = userInput.name;
              let query2 = "SELECT * FROM role";
              connection.query(query2, (err, res) => {
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "role",
                      message: `What role would you like to assign to ${fullName}?`,
                    //   sser's choices are from array made from the roles in roles table
                      choices: () => {
                        let roleArray = [];
                        // role Array created from the result of the mysql query for the role table
                        for (let i = 0; i < res.length; i++) {
                        // pushes the role title & ID from the array
                          roleArray.push(res[i].title + " | " + res[i].id);
                        }
                        // returns new roleArray
                        return roleArray;
                      },
                    },
                  ])
                  .then(function (userInput) {
                    // splits the employee and the role in the middle to seperate"
                    let roleId = userInput.role.split("|")[1];
                    // new role WHERE the indicated name is
                    let query3 = `UPDATE employee SET role_id = "${roleId}" WHERE first_name = "${fullName[0]}" and last_name = "${fullName[1]}"`
                    // update db with the role, uses index of fullName for first/last name
                    connection.query(query3, (err, res) => {
                        if (err) {
                            console.log(err)
                        };
                        console.log(`${fullName} role changed successfully`);
                        init();
                            }
                        );
                    });
                });
            })
        );
    });
};