SELECT j.id,j.total
FROM JSON_TABLE('[{"id":0,"total":12.50},{"id":4000000000,"total":27.50}]',
 '$[*]' COLUMNS(id BIGINT PATH '$.id',total DECIMAL(10,2) PATH '$.total')) AS j
ORDER BY j.id;
