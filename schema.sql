CREATE DATABASE todolist;
USE todolist;

CREATE TABLE list (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE list
ADD COLUMN user_id INT NOT NULL;

-- INSERT INTO list(task, status)
-- VALUES
-- ('do the laundry', 1),
-- ('do the dishes', 0);
