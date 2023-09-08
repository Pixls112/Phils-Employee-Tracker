const inquirer = require("inquirer")
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // Add MySQL password here
        // Dont worry I changed the pass
        password: 'Asianbankai9900!',
        database: 'employeetracker_db'
    },
    console.log(`Connection to employeetracker_db established.`)
)

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    startEmployeeTracker();
});

function startEmployeeTracker() {
    inquirer.prompt(
        {
            type: "list",
            name: "startSelect",
            message: "Please select an option",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role"
            ]
        }
    ).then((data) => {
        if (data.startSelect === "View all departments") {
            db.query(`SELECT * FROM department`, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.table(res);
                    startEmployeeTracker();
                }
            })
        } else if (data.startSelect === "View all roles") {
            db.query(`SELECT * FROM roles`, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.table(res);
                    startEmployeeTracker();
                }
            })
        } else if (data.startSelect === "View all employees") {
            db.query(`SELECT * FROM employee`, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.table(res);
                    startEmployeeTracker();
                }
            })
        } else if (data.startSelect === "Add a department") {
            inquirer.prompt({
                type: "input",
                name: "newDepartment",
                message: "What's the new department?"
            }).then((data) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, data.newDepartment, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        startEmployeeTracker();
                    }
                })
            })
        } else if (data.startSelect === "Add a role") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the title of new role?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary of new role?"
                },
                {
                    type: "input",
                    name: "departmentID",
                    message: "Please set a department ID for this role?"
                }
            ]).then((data) => {
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [data.title, data.salary, data.departmentID], (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        startEmployeeTracker();
                    }
                })
            })

        } else if (data.startSelect === "Add an employee") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "fName",
                    message: "What is the first name of the employee?"
                },
                {
                    type: "input",
                    name: "lName",
                    message: "What is the last name of the employee?"
                },
                {
                    type: "input",
                    name: "roleID",
                    message: "Please give employee a role ID"
                },
                {
                    type: "input",
                    name: "managerID",
                    message: "Please set employees manager ID"
                }
            ]).then((data) => {
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [data.fName, data.lName, data.roleID, data.managerID], (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        startEmployeeTracker();
                    }
                })
            })
        } else if (data.startSelect === "Update an employee role") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "employeeID",
                    message: "What is the employees ID, you wish to update?"
                },
                {
                    type: "input",
                    name: "nameF",
                    message: "What is this employees new first name?"
                },
                {
                    type: "input",
                    name: "nameL",
                    message: "What is this employees new last name?"
                },
                {
                    type: "input",
                    name: "rID",
                    message: "Please set employees new role ID"
                },
                {
                    type: "input",
                    name: "mID",
                    message: "Please set employees new manager ID"
                }
            ]).then((data) => {
                db.query(`UPDATE employee SET first_name = ?, last_name =?, role_id = ?, manager_id = ? WHERE id = ?`, [data.nameF, data.nameL, data.rID, data.mID, data.employeeID], (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        startEmployeeTracker();
                    }
                })
            })
        }
    })
}





