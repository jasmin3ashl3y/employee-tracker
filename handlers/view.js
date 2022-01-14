const { prompt } = require("inquirer");
const db = require("../db/connection");

async function viewEmployees() {
    const employees = await db.findAllEmployees();

    console.log("\n");
    console.table(employees);

    loadMainPrompts();
}

async function viewEmployeesByDepartment() {
    const departments = await db.findAllDepartments();

    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const { departmentId } = await prompt([
        {
            type: "list",
            name: "departmentId",
            message: "Which department would you like to see employees for?",
            choices: departmentChoices,
        },
    ]);

    const employees = await db.findAllEmployeesByDepartment(departmentId);

    console.log("\n");
    console.table(employees);

    loadMainPrompts();
}

async function viewRoles() {
    const roles = await db.findAllRoles();

    console.log("\n");
    console.table(roles);

    loadMainPrompts();
}


async function viewDepts() {
    const departments = await db.findAllDepts();

    console.log("\n");
    console.table(departments);

    loadMainPrompts();
}

module.exports = viewDepts
module.exports = viewRoles
module.exports = viewEmployees
module.exports = viewEmployeesByDepartment