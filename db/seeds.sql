USE employees;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
        ('Danica', 'Jones', 1, 1),
        ('Stephen', 'Stewart', 3, 1),
        ('Carol', 'Sanders', 2, 1),
        ('Jasmine', 'Bernard', 3, 1),
        ('Andrew', 'Goldberg', 4, 1),
        ('Bill', 'Billson', 5, 1);
    
INSERT INTO role (title, salary, department_id)
VALUES 
        ('Manager', 120000, 1),
        ('Assistant Manager', 90000, 2),
        ('Sales Representative', 60000, 3),
        ('Secretary', 50000, 4),
        ('Accounting', 65000, 5);

INSERT INTO department (department_name) 
VALUES  
        ("Management"),
        ("Sales"),
        ("Customer Service"),
        ("Accounting");