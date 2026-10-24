CREATE DATABASE uiabd4_backup_source;
USE uiabd4_backup_source;
CREATE TABLE orders(id INT PRIMARY KEY,total DECIMAL(10,2) NOT NULL) ENGINE=InnoDB;
CREATE TABLE items(id INT PRIMARY KEY,order_id INT NOT NULL,
 FOREIGN KEY(order_id) REFERENCES orders(id)) ENGINE=InnoDB;
INSERT INTO orders VALUES (1,100),(2,200),(3,300);
INSERT INTO items VALUES (11,1),(12,1),(13,3);
SELECT COUNT(*) AS orders_count,SUM(total) AS total_sum FROM orders;
