USE uiabd4_training;
CREATE TEMPORARY TABLE calc_orders(id INT PRIMARY KEY);
CREATE TEMPORARY TABLE calc_materials(
 id INT PRIMARY KEY,order_id INT,qty DECIMAL(10,2),price DECIMAL(10,2));
CREATE TEMPORARY TABLE calc_operations(id INT PRIMARY KEY,order_id INT,cost DECIMAL(10,2));
INSERT INTO calc_orders VALUES (1),(2);
INSERT INTO calc_materials VALUES (11,1,2,10),(12,1,3,20),(13,2,2,NULL);
INSERT INTO calc_operations VALUES (21,1,5),(22,1,15),(23,2,10);

SELECT SUM(m.qty*m.price+o.cost) AS wrong_total
FROM calc_materials m JOIN calc_operations o ON o.order_id=m.order_id WHERE m.order_id=1;

WITH m AS (
 SELECT order_id,SUM(qty*price) AS known_materials,SUM(price IS NULL) AS missing
 FROM calc_materials GROUP BY order_id
), o AS (
 SELECT order_id,SUM(cost) AS work_cost FROM calc_operations GROUP BY order_id
)
SELECT c.id,COALESCE(m.known_materials,0)+COALESCE(o.work_cost,0) AS known_part,
 CASE WHEN COALESCE(m.missing,0)=0
 THEN COALESCE(m.known_materials,0)+COALESCE(o.work_cost,0) ELSE NULL END AS full_cost,
 COALESCE(m.missing,0) AS missing_prices
FROM calc_orders c LEFT JOIN m ON m.order_id=c.id LEFT JOIN o ON o.order_id=c.id ORDER BY c.id;
