USE uiabd4_training;
SELECT VERSION() AS server_version,DATABASE() AS current_database,CURRENT_USER() AS account;
SELECT NOW() AS sampled_at;
SHOW GLOBAL STATUS WHERE Variable_name IN ('Threads_connected','Connections','Uptime','Aborted_connects');
SELECT @@datadir AS datadir,@@innodb_buffer_pool_size AS buffer_pool_bytes;
SELECT TABLE_NAME,DATA_LENGTH,INDEX_LENGTH
FROM information_schema.tables WHERE TABLE_SCHEMA=DATABASE() ORDER BY TABLE_NAME;
