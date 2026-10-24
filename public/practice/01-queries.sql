USE uiabd4_training;
CREATE TEMPORARY TABLE lab_orders (
 id INT PRIMARY KEY, branch_id INT NOT NULL,
 status VARCHAR(12) NOT NULL, total DECIMAL(10,2)
);
CREATE TEMPORARY TABLE lab_items (
 id INT PRIMARY KEY, order_id INT, qty DECIMAL(10,2), price DECIMAL(10,2)
);
INSERT INTO lab_orders VALUES
 (101,1,'new',100),(102,1,'paid',200),(103,2,'new',50),(104,2,'new',NULL);
INSERT INTO lab_items VALUES
 (1,101,2,25),(2,101,1,50),(3,102,1,200),(4,NULL,1,10);

SELECT id,total FROM lab_orders WHERE status='new' ORDER BY id;
SELECT COUNT(*) AS rows_count,COUNT(total) AS known_count,
 SUM(total) AS known_sum,AVG(total) AS known_average
FROM lab_orders WHERE status='new';
SELECT o.id AS order_id,i.id AS item_id
FROM lab_orders o INNER JOIN lab_items i ON i.order_id=o.id ORDER BY o.id,i.id;
SELECT o.id AS order_id,i.id AS item_id
FROM lab_orders o LEFT JOIN lab_items i ON i.order_id=o.id ORDER BY o.id,i.id;
SELECT branch_id,SUM(total) AS known_sum FROM lab_orders
GROUP BY branch_id HAVING SUM(total)>=100 ORDER BY branch_id;
