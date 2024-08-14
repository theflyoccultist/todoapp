CREATE DATABASE todolist;
USE todolist;

CREATE TABLE list (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO list(task, status)
VALUES
('do the laundry', 1),
('do the dishes', 0);
