SELECT j.id,j.total
FROM jsonb_to_recordset('[{"id":0,"total":12.50},{"id":4000000000,"total":27.50}]'::jsonb)
 AS j(id bigint,total numeric(10,2))
ORDER BY j.id;
