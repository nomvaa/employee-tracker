USE employee_db;

INSERT INTO department (department)
VALUES ('Property Management'), ('Accounting'), ('Broker'), ('Office Services');


INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Real Esate Manager', 105000, 1),
    ('Assistant Real Estate Manager', 75000, 1),
    ('Senior Controller', 80000, 2),
    ('Associate Accountant', 60000, 2),
    ('President Broker', 350000, 3),
    ('Vice President Broker', 230000, 3),
    ('Senior Office Manager', 60000, 4),
    ('Office Associate', 35000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Hill', 1, null),
    ('Andrea', 'Wall', 2, 1),
    ('George', 'Bone', 3, 2),
    ('Jackie', 'Luv', 4, 3),
    ('Mike', 'Wilson', 5, null),
    ('Heather', 'Sanchez', 6, null),
    ('Jane', 'Doe', 7, null),
    ('Chrissy', 'Wiggins', 8, null)
