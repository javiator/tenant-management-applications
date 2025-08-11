PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE tenant (
	id INTEGER NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	passport VARCHAR(100), 
	passport_validity DATE, 
	aadhar_no VARCHAR(100), 
	employment_details VARCHAR(255), 
	permanent_address VARCHAR(255), 
	contact_no VARCHAR(20), 
	emergency_contact_no VARCHAR(20), 
	rent FLOAT, 
	security FLOAT, 
	move_in_date DATE, 
	contract_start_date DATE, 
	contract_expiry_date DATE, 
	created_date DATETIME, 
	created_by VARCHAR(50), 
	last_updated DATETIME, 
	last_updated_by VARCHAR(50), property_id INTEGER, 
	PRIMARY KEY (id)
);
INSERT INTO tenant VALUES(1,'B571 - 1B (W) - Tenant','45245',NULL,'2342345','Restaurant','Old Delhi','2345245','2424324232',30000.0,25000.0,'2025-01-01','2025-01-01','2025-12-31','2025-08-11 12:42:26.241921','system','2025-08-11 16:03:41.527987','system',1);
INSERT INTO tenant VALUES(2,'B571 - 1A (E) - Tenant','',NULL,'2342345','Restaurant','Old Delhi','2345245','2424324232',8800.0,8000.0,'2025-01-01','2025-01-01','2025-12-31','2025-08-11 14:19:18.081001','system','2025-08-11 16:03:46.005148','system',2);
INSERT INTO tenant VALUES(3,'B571 - 2A (E) - Tenant','45245','2025-12-28','2342345','Restaurant','Old Delhi','2345245','2424324232',30000.0,30000.0,'2025-08-01','2025-08-01','2025-08-31','2025-08-11 14:37:41.695544','system','2025-08-11 16:03:49.194757','system',3);
INSERT INTO tenant VALUES(4,'B571 - 3rd Floor - Tenant','45245','2025-08-31','2342345','Restaurant','234525','2345245','2424324232',35000.0,30000.0,'2025-08-01','2025-08-01','2025-12-15','2025-08-11 14:38:32.021597','system','2025-08-11 16:49:12.017009','system',4);
INSERT INTO tenant VALUES(5,'B571 - 4th Floor - Tenant','45245','2025-08-01','2342345','Restaurant','Old Delhi','2345245','2424324232',30000.0,25000.0,'2025-08-01','2025-08-01','2025-08-31','2025-08-11 14:39:49.683833','system','2025-08-11 16:03:58.279000','system',5);
INSERT INTO tenant VALUES(6,'B571 - 5B (W) - Tenant','45245','2025-08-31','2342345','Restaurant','Old Delhi','2345245','2424324232',35000.0,30000.0,'2025-08-01','2025-08-01','2025-08-31','2025-08-11 14:40:48.242954','system','2025-08-11 16:04:01.473388','system',6);
INSERT INTO tenant VALUES(7,'B515 - Ground Floor - Tenant','45245','2025-08-31','2342345','Restaurant','Old Delhi','2345245','2424324232',30000.0,30000.0,'2025-08-01','2025-08-01','2025-08-31','2025-08-11 14:41:37.545228','system','2025-08-11 16:04:03.820333','system',7);
INSERT INTO tenant VALUES(8,'B515 - 1st Floor - Tenant','45245','2025-08-01','2342345','Restaurant','Old Delhi','2345245','2424324232',40000.0,30000.0,'2025-08-01','2025-08-01','2025-08-31','2025-08-11 14:42:24.671010','system','2025-08-11 16:04:08.220768','system',8);
INSERT INTO tenant VALUES(9,'B515 - 3rd Floor - Tenant','45245','2025-08-31','2342345','Restaurant','Old Delhi','2345245','2424324232',30000.0,30000.0,'2025-08-01','2025-08-01','2025-08-31','2025-08-11 14:43:09.054621','system','2025-08-11 16:03:33.244178','system',9);
INSERT INTO tenant VALUES(10,'B515 - 4th Floor - Tenant','45245','2025-08-31','2342345','Restaurant','Old Delhi','2345245','2424324232',30000.0,25000.0,'2025-08-01','2025-08-01','2025-08-31','2025-08-11 14:44:01.355458','system','2025-08-11 16:04:19.935430','system',10);
CREATE TABLE property (
	id INTEGER NOT NULL, 
	address VARCHAR(255) NOT NULL, 
	rent FLOAT, 
	maintenance FLOAT, 
	created_date DATETIME, 
	created_by VARCHAR(50), 
	last_updated DATETIME, 
	last_updated_by VARCHAR(50), 
	PRIMARY KEY (id)
);
INSERT INTO property VALUES(1,'B571 - 1B (W)',11000.0,300.0,'2025-08-11 12:32:29.575817','system','2025-08-11 14:22:44.559012','system');
INSERT INTO property VALUES(2,'B571 - 1A (E)',8000.0,300.0,'2025-08-11 14:21:36.180493','system','2025-08-11 14:21:36.180493','system');
INSERT INTO property VALUES(3,'B571 - 2A (E)',10300.0,300.0,'2025-08-11 14:23:16.691960','system','2025-08-11 14:23:16.691960','system');
INSERT INTO property VALUES(4,'B571 - 3rd Floor',18000.0,400.0,'2025-08-11 14:23:51.008427','system','2025-08-11 14:23:51.008427','system');
INSERT INTO property VALUES(5,'B571 - 4th Floor',18000.0,400.0,'2025-08-11 14:24:28.619635','system','2025-08-11 14:24:28.620632','system');
INSERT INTO property VALUES(6,'B571 - 5B (W)',7150.0,400.0,'2025-08-11 14:25:01.645806','system','2025-08-11 14:25:01.645806','system');
INSERT INTO property VALUES(7,'B515 - Ground Floor',0.0,0.0,'2025-08-11 14:25:44.587192','system','2025-08-11 14:25:44.588154','system');
INSERT INTO property VALUES(8,'B515 - 1st Floor',0.0,0.0,'2025-08-11 14:26:11.976536','system','2025-08-11 14:26:11.976536','system');
INSERT INTO property VALUES(9,'B515 - 3rd Floor',18750.0,400.0,'2025-08-11 14:27:51.545587','system','2025-08-11 14:27:51.546587','system');
INSERT INTO property VALUES(10,'B515 - 4th Floor',18000.0,500.0,'2025-08-11 14:28:15.636912','system','2025-08-11 14:28:15.636912','system');
CREATE TABLE IF NOT EXISTS "transaction" (
	id INTEGER NOT NULL, 
	property_id INTEGER NOT NULL, 
	tenant_id INTEGER, 
	type VARCHAR(50) NOT NULL, 
	for_month VARCHAR(20), 
	amount FLOAT NOT NULL, 
	created_date DATETIME, 
	created_by VARCHAR(50), 
	last_updated DATETIME, 
	last_updated_by VARCHAR(50), transaction_date DATE, comments TEXT, 
	PRIMARY KEY (id), 
	FOREIGN KEY(property_id) REFERENCES property (id), 
	FOREIGN KEY(tenant_id) REFERENCES tenant (id)
);
INSERT INTO "transaction" VALUES(3,1,1,'security','January',23121.0,'2025-08-11 12:46:54.470788','system','2025-08-11 17:24:26.152905','system','2025-08-11',NULL);
INSERT INTO "transaction" VALUES(4,1,1,'rent','July',25000.0,'2025-08-11 13:42:44.078229','system','2025-08-11 16:44:02.761842','system','2025-08-06',NULL);
INSERT INTO "transaction" VALUES(5,3,3,'electricity','July',2000.0,'2025-08-11 16:10:31.360972','system','2025-08-11 16:44:10.925368','system','2025-08-05',NULL);
INSERT INTO "transaction" VALUES(6,1,1,'payment_received','July',20000.0,'2025-08-11 16:28:51.930433','system','2025-08-11 16:44:20.365269','system','2025-08-01',NULL);
INSERT INTO "transaction" VALUES(7,5,5,'rent','August',21000.0,'2025-08-11 19:10:37.770633','system','2025-08-11 19:10:37.770633','system','2025-08-11','August rent');
COMMIT;
