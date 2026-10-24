USE uiabd4_training;
CREATE TEMPORARY TABLE index_orders(id INT PRIMARY KEY,status VARCHAR(12) NOT NULL);
INSERT INTO index_orders
WITH digits AS (
 SELECT 0 AS d UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
)
SELECT n+1,CASE WHEN MOD(n+1,1000)=0 THEN 'rare' ELSE 'common' END
FROM (
 SELECT a.d+10*b.d+100*c.d+1000*d.d AS n
 FROM digits a CROSS JOIN digits b CROSS JOIN digits c CROSS JOIN digits d
) AS numbers;
SELECT COUNT(*) AS n, SUM(status='rare') AS rare_rows FROM index_orders;
EXPLAIN ANALYZE FORMAT=TREE SELECT SUM(id) FROM index_orders WHERE status='rare';
SELECT SUM(id) AS checksum_before FROM index_orders WHERE status='rare';
CREATE INDEX idx_status_id ON index_orders(status,id);
EXPLAIN ANALYZE FORMAT=TREE SELECT SUM(id) FROM index_orders WHERE status='rare';
SELECT SUM(id) AS checksum_after FROM index_orders WHERE status='rare';
