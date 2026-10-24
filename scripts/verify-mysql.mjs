import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const bin=process.argv[2],port=process.argv[3];if(!bin||!port)throw Error('Specify isolated MySQL bin directory and port.');
const args=['--no-defaults','--protocol=TCP','--host=127.0.0.1','--port='+port,'--user=root','--default-character-set=utf8mb4','--batch','--raw','--skip-column-names'];
const run=sql=>{const r=spawnSync(path.join(bin,'mysql'+(process.platform==='win32'?'.exe':'')),args,{input:sql,encoding:'utf8',windowsHide:true});assert.equal(r.status,0,r.stderr);return r.stdout.trim().replaceAll('\r\n','\n');};
const version=run('SELECT VERSION();');assert.match(version,/^8\.4\./);
// The caller supplies an isolated server. Never drop or alter an existing database.
const db='uiabd_review_'+Date.now();run(`CREATE DATABASE ${db};`);
const checks=[];
function check(name,sql,expected){const actual=run(`USE ${db};\n${sql}`);assert.equal(actual,expected,name);checks.push({name,status:'passed'});}
check('WHERE strict boundary and NULL',`CREATE TABLE orders(id INT PRIMARY KEY,status VARCHAR(12),total DECIMAL(10,2)) ENGINE=InnoDB; INSERT INTO orders VALUES(11,'new',120),(12,'paid',200),(13,'new',80),(14,'cancelled',90); SELECT id,total FROM orders WHERE status='new' ORDER BY id;`,'11\t120.00\n13\t80.00');
check('Independent query sum','SELECT COUNT(*),SUM(total) FROM orders WHERE status=\'new\';','2\t200.00');
check('INNER and LEFT with multiplicity',`CREATE TABLE parent(id INT PRIMARY KEY); INSERT INTO parent VALUES(21),(22),(23); CREATE TABLE items(id INT PRIMARY KEY,order_id INT); INSERT INTO items VALUES(1,21),(2,21),(3,23),(4,NULL); SELECT COUNT(*) FROM parent p JOIN items i ON i.order_id=p.id; SELECT COUNT(*) FROM parent p LEFT JOIN items i ON i.order_id=p.id;`,'3\n4');
check('Group filter after aggregation',`CREATE TABLE branch_values(branch_id INT,total INT); INSERT INTO branch_values VALUES(1,40),(1,60),(2,70),(2,30),(3,5); SELECT branch_id,SUM(total) FROM branch_values GROUP BY branch_id HAVING SUM(total)>=100 ORDER BY branch_id;`,'1\t100\n2\t100');
check('NULL is not zero',`CREATE TABLE amounts(amount DECIMAL(8,2)); INSERT INTO amounts VALUES(0),(NULL),(12),(18),(NULL); SELECT COUNT(*),COUNT(amount),SUM(amount),AVG(amount) FROM amounts;`,'5\t3\t30.00\t10.000000');
check('DECIMAL money and separate items',`CREATE TABLE prices(price DECIMAL(8,2)); INSERT INTO prices VALUES(25),(25),(40),(40); SELECT CAST(7.25*6 AS DECIMAL(8,2)); SELECT SUM(price),SUM(DISTINCT price) FROM prices;`,'43.50\n130.00\t65.00');
check('Preaggregating independent children',`CREATE TABLE materials(order_id INT,cost INT);CREATE TABLE operations(order_id INT,cost INT);INSERT INTO materials VALUES(1,40),(1,60);INSERT INTO operations VALUES(1,10),(1,20),(1,30); SELECT COUNT(*),SUM(m.cost+p.cost) FROM materials m JOIN operations p USING(order_id);SELECT m.cost+p.cost FROM(SELECT order_id,SUM(cost) cost FROM materials GROUP BY order_id)m JOIN(SELECT order_id,SUM(cost) cost FROM operations GROUP BY order_id)p USING(order_id);`,'6\t420\n160');
check('CALL does not commit its caller transaction',`DELIMITER //
CREATE PROCEDURE change_order() BEGIN UPDATE orders SET total=300 WHERE id=13; END//
DELIMITER ;
START TRANSACTION; UPDATE orders SET total=500 WHERE id IN(11,12);CALL change_order();SELECT COUNT(*) FROM orders WHERE total IN(300,500);ROLLBACK;SELECT COUNT(*) FROM orders WHERE total IN(300,500);`,'3\n0');
check('Unique violation rolls back statement then explicit ROLLBACK',`CREATE TABLE uniques(id INT PRIMARY KEY,code VARCHAR(10) UNIQUE) ENGINE=InnoDB;INSERT INTO uniques VALUES(1,'A');
DELIMITER //
CREATE PROCEDURE unique_test() BEGIN DECLARE CONTINUE HANDLER FOR 1062 BEGIN END; START TRANSACTION;INSERT INTO uniques VALUES(2,'B');INSERT INTO uniques VALUES(3,'A');SELECT COUNT(*) FROM uniques WHERE code='B';ROLLBACK;SELECT COUNT(*) FROM uniques WHERE code='B';END//
DELIMITER ;
CALL unique_test();`,'1\n0');
check('Trigger ignores unchanged NOT NULL status',`CREATE TABLE audit_events(id INT AUTO_INCREMENT PRIMARY KEY,order_id INT);CREATE TABLE status_orders(id INT PRIMARY KEY,status VARCHAR(12) NOT NULL) ENGINE=InnoDB;INSERT INTO status_orders VALUES(1,'new');
DELIMITER //
CREATE TRIGGER log_status AFTER UPDATE ON status_orders FOR EACH ROW BEGIN IF OLD.status<>NEW.status THEN INSERT INTO audit_events(order_id) VALUES(NEW.id);END IF;END//
DELIMITER ;
UPDATE status_orders SET status='paid' WHERE id=1;UPDATE status_orders SET status='paid' WHERE id=1;UPDATE status_orders SET status='closed' WHERE id=1;SELECT COUNT(*) FROM audit_events;`,'2');
check('Nullable equality in MySQL','SELECT NULL=NULL,NULL<=>NULL,NOT(NULL<=>\'paid\');','NULL\t1\t1');
const report={version,isolatedDatabase:db,checks,limits:'Executed SQL fixtures only. Performance measurements and monitoring scenarios in the course remain explicitly stated educational data. PostgreSQL server execution is not claimed.'};
fs.writeFileSync('reports/mysql-review-2026-10-24.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({version,checks:checks.length,status:'passed'}));
