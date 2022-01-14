const { prompt } = require("inquirer");
const db = require("../db/connection");

async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
  }));

  const { employeeId } = await prompt([
      {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: employeeChoices,
      },
  ]);

  const roles = await db.findAllRoles()

  const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
  }));

  const { roleId } = await prompt([
      {
          type: "list",
          name: "roleId",
          message: "Which role do you want to assign the selected employee?",
          choices: roleChoices,
      },
  ]);

  await db.updateEmployeeRole(employeeId, roleId);

  console.log("Updated employee's role");

  loadMainPrompts();
}

module.exports = updateEmployeeRole