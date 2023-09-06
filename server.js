const inquirer = require("inquirer")
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // Add MySQL password here
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
            console.log(data)
        })
};

