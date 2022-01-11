

function viewDepts() {
    // show dept names + Ids
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) {
            console.log(err)
        };
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

module.exports = viewDepts
module.exports = viewRoles
module.exports = viewEmployees