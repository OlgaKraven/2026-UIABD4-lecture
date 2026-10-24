SELECT DATABASE() AS target;
SELECT COUNT(*) AS orders_count,SUM(total) AS total_sum FROM orders;
SELECT COUNT(*) AS broken_links FROM items i LEFT JOIN orders o ON o.id=i.order_id WHERE o.id IS NULL;
SELECT o.id,o.total,COUNT(i.id) AS items_count
FROM orders o LEFT JOIN items i ON i.order_id=o.id GROUP BY o.id,o.total ORDER BY o.id;
