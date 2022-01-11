const inquirer = require('inquirer')

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

module.exports = addDept
module.exports = addRole
module.exports = addEmployee