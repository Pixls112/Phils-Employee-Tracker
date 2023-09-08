const inquirer = require("inquirer")
const mysql = require('mysql2');

//This is used to create a connection with the SQL database 
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // Add MySQL password here
        // Dont worry I changed the pass
        password: '',
        database: 'employeetracker_db'
    },
    console.log(`Connection to employeetracker_db established.`)
)
//This acts as the initializer for application. When data base is connected, the function startEmployeeTracker will be initialized
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    startEmployeeTracker();
});

//This function is essentially the backbone of the application
function startEmployeeTracker() {
    //This prompt shows the user the different choices they have to view the database
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
        //This if statement acts when the user choice matches the given value and will then load the db.query
        //This if statement will show the user all departments in the database
        if (data.startSelect === "View all departments") {
            db.query(`SELECT * FROM department`, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.table(res);
                    startEmployeeTracker();
                }
            })
            //This if statement will show all roles in the database
        } else if (data.startSelect === "View all roles") {
            db.query(`SELECT * FROM roles`, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.table(res);
                    startEmployeeTracker();
                }
            })
            //This if statement will show all employees in the database
        } else if (data.startSelect === "View all employees") {
            db.query(`SELECT * FROM employee`, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.table(res);
                    startEmployeeTracker();
                }
            })
            //This if statement will prompt the user about creating a new department.
        } else if (data.startSelect === "Add a department") {
            inquirer.prompt({
                type: "input",
                name: "newDepartment",
                message: "What's the new department?"
                //Using the users choices it will then insert the users data into the db.query allowing it to affect the database.
            }).then((data) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, data.newDepartment, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        startEmployeeTracker();
                    }
                })
            })
            //This if statement will prompt the user about adding a new role in the database
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
            //This if statement will prompt the user about adding a new employee to the database
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
            //This if statement allows the user to update an existing tableset in the database.
            //By prompting the user it will ask for the ID to be able to correctly affect the proper datatable
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
                //It will then use the user choices and input that data into the db.query and update the tableset in the database
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





