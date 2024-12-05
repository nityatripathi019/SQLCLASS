-- SHOW DATABASES;
-- USE delta_app;
-- SHOW TABLES;

CREATE TABLE user(
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL
)

-- insert into user(id,username,email,password)values
-- ("101","diyatripathi19","diyatripathu@gmail.com","bhaikabdy2007")