USE uiabd4_training;
CREATE TABLE permission_orders(id INT PRIMARY KEY,total DECIMAL(10,2));
INSERT INTO permission_orders VALUES (1,40);
CREATE ROLE 'uiabd4_reader';
GRANT SELECT ON uiabd4_training.permission_orders TO 'uiabd4_reader';
CREATE USER 'uiabd4_readonly'@'localhost' IDENTIFIED BY RANDOM PASSWORD;
GRANT 'uiabd4_reader' TO 'uiabd4_readonly'@'localhost';
SET DEFAULT ROLE 'uiabd4_reader' TO 'uiabd4_readonly'@'localhost';
