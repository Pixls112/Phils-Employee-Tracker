INSERT INTO department(name)
VALUES ("Audio"), 
("Programmer"), 
("Art/Design"), 
("Tester");

INSERT INTO roles(title, salary, department_id)
VALUES ("Game Audio Designer", 150000, 1), 
("Game Programmer", 113000, 2),
("Game Art Designer", 112000, 3), 
("Game Teser", 40000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("David", "Martinez", 1, 2),
("Cayde", "6", 2, 4),
("Kiryu", "Kazuma", 3, 3),
("Handsome", "Jack", 4, 1);
