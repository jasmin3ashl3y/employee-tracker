const inquirer = require('inquirer')

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

    module.exports = updateEmployee