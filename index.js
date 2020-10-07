var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
var CFonts = require("cfonts");

//Title section

CFonts.say('Employee|Tracker', {
    font: 'block',
    align: 'center',
    colors: ['system'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
});

//connecting db
var connection = mysql.createConnection({
    host: "localhost",

  // Your port; if not 3306
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected!')
    start();
});

//Run app
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices:
                [
                    "View All Employees",
                    "View Employees by Department",
                    "View Employees by Role",
                    "Add Employee",
                    "Remove Employee",
                    "Quit"
                ]
        })
        .then(function (answer) {
            // based on their answer, call the function
            if (answer.action === "View All Employees") {
                viewAllEmp();
            }
            else if (answer.action === "View Employees by Department") {
                viewEmpDepartment();
            }
            else if (answer.action === "View Employees by Role") {
                viewEmpRole();
            }
            else if (answer.action === "Add Employee") {
                addEmployee();
            }
            else if (answer.action === "Remove Employee") {
                removeEmployee();
            }
            else if (answer.action === "Update Employee's Role") {
                updateRole();
            }
            // else if (answer.begin === "Remove Employee") {
            //   removeEmp();
            // }
            else if (answer.action === "Quit") {
                console.log("End");
            }
            else {
                connection.end();
            }
        });
}

//View all employees
function viewAllEmp() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id)", function (err, result) {
        if (err) throw err;

        console.table(result);
        start();
    });
}

//View all employees by department
function viewEmpDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "list",
            message: "Which department would you like to see employees for?",
            choices: ["Property Management", "Accounting", "Broker", "Office Services"]
        })
        .then(function (answer) {
            if (answer.department === "Property Management" || "Accounting" || "Broker" || "Office Services") {
                connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id) WHERE department = ?", [answer.department], function (err, result) {
                    if (err) throw err;

                    console.table(result);
                    start();
                });
            }
        });
}

//View all employees by role
function viewEmpRole() {

    inquirer
        .prompt({
            name: "role",
            type: "list",
            message: "Which role would you like to see employees for?",
            choices:
                [
                    "Real Estate Manager",
                    "Assistant Real Estate Manager",
                    "Senior Accountant",
                    "Associate Accountant",
                    "President Broker",
                    "Vice President Broker",
                    "Senior Office Manager",
                    "Office Associate"
                ]
        })
        .then(function (answer) {
            if (answer.role === "Real Estate Manager" || "Assistant Real Estate Manager" || "Senior Accountant" || "Associate Accountant" || "President Broker" || "Vice President Broker" || "Senior Office Manager" || "Office Associate") {
                connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id) WHERE title = ?", [answer.role], function (err, result) {
                    if (err) throw err;

                    console.table(result);
                    start();
                });
            }
        });
}

//Add new employee

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first",
                type: "input",
                message: "What is your employees first name?"
            },
            {
                name: "last",
                type: "input",
                message: "What is your employees last name?"
            },
            {
                name: "title",
                type: "list",
                message: "What is your employees role?",
                choices:
                    [
                        "Real Estate Manager",
                        "Assistant Real Estate Manager",
                        "Senior Accountant",
                        "Associate Accountant",
                        "President Broker",
                        "Vice President Broker",
                        "Senior Office Manager",
                        "Office Associate"
                    ]
            },
            {
                name: "salary",
                type: "input",
                message: "What is employees salary?"
            },
            {
                name: "dept",
                type: "list",
                message: "What is your employees department?",
                choices: ["Property Management", "Accounting", "Broker", "Office Services"]
            },
            {
                name: "manager",
                type: "list",
                message: "Who is your employees manager?",
                choices: ["John", "Andrea", "George", "Jackie", "None"]
            }
        ])
        .then(function (answer) {

            var dept_id;
            if (answer.dept === "Property Management") {
                dept_id = 1;
            }
            else if (answer.dept === "Accounting") {
                dept_id = 2;
            }
            else if (answer.dept === "Broker") {
                dept_id = 3;
            }
            else if (answer.dept === "Office Services") {
                dept_id = 4;
            }

            connection.query("INSERT INTO roles SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: dept_id
                },
                function (err, result) {
                    if (err) throw err;
                }
            );

            var manager_id;
            if (answer.manager === "John") {
                manager_id = 1;
            }
            else if (answer.manager === "Andrea") {
                manager_id = 2;
            }
            else if (answer.manager === "George") {
                manager_id = 3;
            }
            else if (answer.manager === "Jackie") {
                manager_id = 4;
            }
            else if (answer.manager === "None") {
                manager_id = null;
            }

            var role_id;
            if (answer.title === "Real Estate Manager") {
                role_id = 1;
            }
            else if (answer.title === "Assistant Real Estate Manager") {
                role_id = 2;
            }
            else if (answer.title === "Senior Accountant") {
                role_id = 3;
            }
            else if (answer.title === "Associate Accountant") {
                role_id = 4;
            }
            else if (answer.title === "President Broker") {
                role_id = 5;
            }
            else if (answer.title === "Vice President Broker") {
                role_id = 6;
            }
            else if (answer.title === "Senior Office Manager") {
                role_id = 7;
            }
            else if (answer.title === "Office Associate") {
                role_id = 8;
            }

            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.first,
                    last_name: answer.last,
                    role_id: role_id,
                    manager_id: manager_id
                },
                function (err, result) {
                    if (err) throw err;

                    console.log("New employee added");
                    start();
                }
            );
        });
}
//Delete employee
function removeEmployee() {
    console.log("Removing employee...\n");
    connection.query("select * from employee", function (err, result) {
        if (err) throw err;
        // let employees = []
        // result.forEach(row => {
        //     employees.push({name: `${row.first_name} ${row.last_name}`})
        // });
        inquirer
        .prompt([
            {
                name: "remove",
                type: "list",
                message: "Who would you like to remove?",
                choices: result.map(row => {return `${row.id} ${row.first_name} ${row.last_name}` })
            }]).then(function(answer) {
                console.log(answer.remove)
                const index =  parseInt(answer.remove.split()[0])
                connection.query(
                    "DELETE FROM employee WHERE id = ?",
                    index,
                    function(err, res) {
                      if (err) throw err;
                      console.log(res.affectedRows + " has been removed!\n");
                      // Call start function after
                      start();
                    }
                  );
            })
    });
    
  }

