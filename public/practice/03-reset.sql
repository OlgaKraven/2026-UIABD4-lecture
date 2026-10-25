USE uiabd4_training;
-- Reset only the two exercise rows before repeating the rollback demonstration.
-- Definitions from 03-procedure.sql must already exist; no active exercise transaction remains.
START TRANSACTION;
UPDATE procedure_orders SET status='paid' WHERE id=1;
UPDATE procedure_orders SET status='new' WHERE id=2;
DELETE FROM procedure_audit;
COMMIT;
SELECT id,status FROM procedure_orders ORDER BY id;
SELECT COUNT(*) AS audit_before_repeat FROM procedure_audit;
