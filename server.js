const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const actionHandler = require('./handlers')
require("./db/connection");
require("console.table");

init();

// Display logo text, load main prompts
function init() {
    const logoText = logo({ name: "Employee Tracker" }).render();

    console.log(logoText);

    loadMainPrompts();
}

async function loadMainPrompts() {
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES",
                },
                {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
                },
                
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE",
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES",
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE",
                },
                
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS",
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT",
                },
                
                {
                    name: "Quit",
                    value: "QUIT",
                },
            ],
        },
    ]);

    // Call the appropriate function depending on what the user chose
    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            return viewEmployeesByDepartment();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "ADD_DEPARTMENT":
            return addDepartment();
        case "VIEW_ROLES":
            return viewRoles();
        case "ADD_ROLE":
            return addRole();
        default:
            return quit();
    }
}

function main() {
    actionHandler(action)
    .then(message => {
        if (message) {
            console.log(message)
        }
    })
    .then(main)
}

main()

function quit() {
    console.log("Goodbye!");
    process.exit();
}