USE uiabd4_training;
CREATE TABLE procedure_orders(id INT PRIMARY KEY,status VARCHAR(12) NOT NULL) ENGINE=InnoDB;
CREATE TABLE procedure_audit(
 id INT AUTO_INCREMENT PRIMARY KEY,order_id INT,old_status VARCHAR(12),new_status VARCHAR(12)
) ENGINE=InnoDB;
INSERT INTO procedure_orders VALUES (1,'paid'),(2,'new');
DELIMITER //
CREATE TRIGGER procedure_order_audit AFTER UPDATE ON procedure_orders FOR EACH ROW
BEGIN
 IF OLD.status<>NEW.status THEN
  INSERT INTO procedure_audit(order_id,old_status,new_status) VALUES(NEW.id,OLD.status,NEW.status);
 END IF;
END//
CREATE PROCEDURE close_paid_order(IN p_id INT)
BEGIN
 DECLARE v_status VARCHAR(12) DEFAULT NULL;
 DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_status=NULL;
 IF p_id IS NULL THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Order ID is required'; END IF;
 SELECT status INTO v_status FROM procedure_orders WHERE id=p_id FOR UPDATE;
 IF v_status IS NULL THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Order not found'; END IF;
 IF v_status<>'paid' THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Order is not paid'; END IF;
 UPDATE procedure_orders SET status='closed' WHERE id=p_id;
END//
DELIMITER ;
START TRANSACTION;
CALL close_paid_order(1);
SELECT status FROM procedure_orders WHERE id=1;
SELECT COUNT(*) AS audit_inside FROM procedure_audit;
ROLLBACK;
SELECT status FROM procedure_orders WHERE id=1;
SELECT COUNT(*) AS audit_after_rollback FROM procedure_audit;
START TRANSACTION;
CALL close_paid_order(1);
COMMIT;
SELECT id,status FROM procedure_orders ORDER BY id;
SELECT order_id,old_status,new_status FROM procedure_audit;
