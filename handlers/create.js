const { prompt } = require("inquirer");
const db = require("../db/connection")

async function addRole() {
    const departments = await db.findAllDepts();

    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
    }));

    const role = prompt([
        {
            name: "title",
            message: "What is the name of the role?",
        },
        {
            name: "salary",
            message: "What is the salary of the role?",
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentChoices,
        },
    ]);

    await db.createRole(role);

    console.log(`Added ${role.title} to the database`);

    loadMainPrompts();
}


async function addDept() {
    const department = await prompt([
        {
            name: "name",
            message: "What is the name of the department?",
        },
    ]);

    await db.createDept(department);

    console.log(`Added ${department.name} to the database`);

    loadMainPrompts();
}

async function addEmployee() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();

    const employee = await prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?",
        },
        {
            name: "last_name",
            message: "What is the employee's last name?",
        },
    ]);

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
    }));

    const { roleId } = await prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices,
    });

    employee.role_id = roleId;

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    managerChoices.unshift({ name: "None", value: null });

    const { managerId } = await prompt({
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoices,
    });

    employee.manager_id = managerId;

    await db.createEmployee(employee);

    console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database`
    );

    loadMainPrompts();
}

module.exports = addDept
module.exports = addRole
module.exports = addEmployee