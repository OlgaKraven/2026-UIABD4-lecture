CREATE TEMPORARY TABLE transfer_orders(
 id BIGINT PRIMARY KEY CHECK(id BETWEEN 0 AND 4294967295),
 total DECIMAL(10,2) NOT NULL
);
INSERT INTO transfer_orders VALUES (0,12.50),(4000000000,27.50);
SELECT id,total FROM transfer_orders ORDER BY id;
SELECT COUNT(*) AS n,SUM(total) AS total_sum,MAX(id) AS max_id FROM transfer_orders;
