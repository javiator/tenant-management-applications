

-- Insert records into property table
INSERT INTO property (
  id, address, rent, maintenance, created_date, created_by, last_updated, last_updated_by
) VALUES
  (1, 'B175 - 10B (W)', 11000.0, 300.0, TIMESTAMP '2025-08-11 12:32:29', 'system', TIMESTAMP '2025-08-11 14:22:44', 'system'),
  (2, 'B175 - 10A (E)', 8000.0, 300.0, TIMESTAMP '2025-08-11 14:21:36', 'system', TIMESTAMP '2025-08-11 14:21:36', 'system'),
  (3, 'B175 - 20A (E)', 10300.0, 300.0, TIMESTAMP '2025-08-11 14:23:16', 'system', TIMESTAMP '2025-08-11 14:23:16', 'system'),
  (4, 'B175 - 7rd Floor', 18000.0, 400.0, TIMESTAMP '2025-08-11 14:23:51', 'system', TIMESTAMP '2025-08-11 14:23:51', 'system'),
  (5, 'B175 - 8th Floor', 18000.0, 400.0, TIMESTAMP '2025-08-11 14:24:28', 'system', TIMESTAMP '2025-08-11 14:24:28', 'system'),
  (6, 'B175 - 9B (W)', 7150.0, 400.0, TIMESTAMP '2025-08-11 14:25:01', 'system', TIMESTAMP '2025-08-11 14:25:01', 'system'),
  (7, 'B5177 - Ground Floor', 0.0, 0.0, TIMESTAMP '2025-08-11 14:25:44', 'system', TIMESTAMP '2025-08-11 14:25:44', 'system'),
  (8, 'B5177 - 11st Floor', 0.0, 0.0, TIMESTAMP '2025-08-11 14:26:11', 'system', TIMESTAMP '2025-08-11 14:26:11', 'system'),
  (9, 'B5177 - 31st Floor', 18750.0, 400.0, TIMESTAMP '2025-08-11 14:27:51', 'system', TIMESTAMP '2025-08-11 14:27:51', 'system'),
  (10, 'B5177 - 41st Floor', 18000.0, 500.0, TIMESTAMP '2025-08-11 14:28:15', 'system', TIMESTAMP '2025-08-11 14:28:15', 'system'),
  (11, 'B5177 - 51st Floor', 20000.0, 600.0, TIMESTAMP '2025-08-11 14:29:00', 'system', TIMESTAMP '2025-08-11 14:29:00', 'system'),
  (12, 'B5177 - 61st Floor', 22000.0, 650.0, TIMESTAMP '2025-08-11 14:29:45', 'system', TIMESTAMP '2025-08-11 14:29:45', 'system');


-- Insert records into tenant table (references property_id=1)
INSERT INTO tenant (
  id, name, property_id, passport, passport_validity, aadhar_no, employment_details,
  permanent_address, contact_no, emergency_contact_no, rent, security,
  move_in_date, contract_start_date, contract_expiry_date,
  created_date, created_by, last_updated, last_updated_by
) VALUES
  (1, 'B175 - 10B (W) - Tenant', 1, '45245', NULL, '2342345', 'Restaurant',
    'Old Delhi', '2345245', '2424324232', 30000.0, 25000.0,
    DATE '2025-01-01', DATE '2025-01-01', DATE '2025-12-31',
    TIMESTAMP '2025-08-11 12:42:26', 'system', TIMESTAMP '2025-08-11 16:03:41', 'system'),
  (2, 'B175 - 10A (E) - Tenant', 2, '45246', NULL, '2342346', 'Engineer',
    'New Delhi', '2345246', '2424324233', 8800.0, 8000.0,
    DATE '2025-01-01', DATE '2025-01-01', DATE '2025-12-31',
    TIMESTAMP '2025-08-11 14:19:18', 'system', TIMESTAMP '2025-08-11 16:03:46', 'system'),
  (3, 'B175 - 20A (E) - Tenant', 3, '45247', DATE '2025-12-28', '2342347', 'Doctor',
    'Gurgaon', '2345247', '2424324234', 10300.0, 9000.0,
    DATE '2025-08-01', DATE '2025-08-01', DATE '2025-08-31',
    TIMESTAMP '2025-08-11 14:37:41', 'system', TIMESTAMP '2025-08-11 16:03:49', 'system'),
  (4, 'B175 - 7th Floor - Tenant', 4, '45248', DATE '2025-08-31', '2342348', 'Teacher',
    'Noida', '2345248', '2424324235', 18000.0, 15000.0,
    DATE '2025-08-01', DATE '2025-08-01', DATE '2025-12-15',
    TIMESTAMP '2025-08-11 14:38:32', 'system', TIMESTAMP '2025-08-11 16:49:12', 'system'),
  (5, 'B175 - 8th Floor - Tenant', 5, '45249', DATE '2025-08-01', '2342349', 'Artist',
    'Faridabad', '2345249', '2424324236', 18000.0, 14000.0,
    DATE '2025-08-01', DATE '2025-08-01', DATE '2025-08-31',
    TIMESTAMP '2025-08-11 14:39:49', 'system', TIMESTAMP '2025-08-11 16:03:58', 'system'),
  (6, 'B175 - 9B (W) - Tenant', 6, '45250', DATE '2025-08-31', '2342350', 'Lawyer',
    'Ghaziabad', '2345250', '2424324237', 7150.0, 7000.0,
    DATE '2025-08-01', DATE '2025-08-01', DATE '2025-08-31',
    TIMESTAMP '2025-08-11 14:40:48', 'system', TIMESTAMP '2025-08-11 16:04:01', 'system'),
  (7, 'B5177 - Ground Floor - Tenant', 7, '45251', DATE '2025-08-31', '2342351', 'Student',
    'Delhi', '2345251', '2424324238', 0.0, 0.0,
    DATE '2025-08-01', DATE '2025-08-01', DATE '2025-08-31',
    TIMESTAMP '2025-08-11 14:41:37', 'system', TIMESTAMP '2025-08-11 16:04:03', 'system'),
  (8, 'B5177 - 11st Floor - Tenant', 8, '45252', DATE '2025-08-01', '2342352', 'Designer',
    'Delhi', '2345252', '2424324239', 0.0, 0.0,
    DATE '2025-08-01', DATE '2025-08-01', DATE '2025-08-31',
    TIMESTAMP '2025-08-11 14:42:24', 'system', TIMESTAMP '2025-08-11 16:04:08', 'system'),
  (9, 'B5177 - 31st Floor - Tenant', 9, '45253', DATE '2025-08-31', '2342353', 'Manager',
    'Delhi', '2345253', '2424324240', 18750.0, 15000.0,
    DATE '2025-08-01', DATE '2025-08-01', DATE '2025-08-31',
    TIMESTAMP '2025-08-11 14:43:09', 'system', TIMESTAMP '2025-08-11 16:03:33', 'system'),
  (10, 'B5177 - 41st Floor - Tenant', 10, '45254', DATE '2025-08-31', '2342354', 'Consultant',
    'Delhi', '2345254', '2424324241', 18000.0, 16000.0,
    DATE '2025-08-01', DATE '2025-08-01', DATE '2025-08-31',
    TIMESTAMP '2025-08-11 14:44:01', 'system', TIMESTAMP '2025-08-11 16:04:19', 'system'),
  (11, 'B5177 - 51st Floor - Tenant', 11, '45255', DATE '2025-08-31', '2342355', 'Entrepreneur',
    'Delhi', '2345255', '2424324242', 20000.0, 17000.0,
    DATE '2025-08-01', DATE '2025-08-01', DATE '2025-08-31',
    TIMESTAMP '2025-08-11 14:45:01', 'system', TIMESTAMP '2025-08-11 16:05:19', 'system'),
  (12, 'B5177 - 61st Floor - Tenant', 12, '45256', DATE '2025-08-31', '2342356', 'Scientist',
    'Delhi', '2345256', '2424324243', 22000.0, 18000.0,
    DATE '2025-08-01', DATE '2025-08-01', DATE '2025-08-31',
    TIMESTAMP '2025-08-11 14:46:01', 'system', TIMESTAMP '2025-08-11 16:06:19', 'system'
);


-- Insert records into transaction table (references property_id=1, tenant_id=1)
INSERT INTO "TRANSACTION" (
  id, property_id, tenant_id, type, for_month, amount, transaction_date, comments,
  created_date, created_by, last_updated, last_updated_by
) VALUES (
  1, 1, 1, 'rent', 'January', 25000.0, DATE '2025-01-05', 'January rent',
  TIMESTAMP '2025-01-05 10:00:00', 'system', TIMESTAMP '2025-01-05 10:00:00', 'system'
);
INSERT INTO "TRANSACTION" (
  id, property_id, tenant_id, type, for_month, amount, transaction_date, comments,
  created_date, created_by, last_updated, last_updated_by
) VALUES
  (2, 1, 1, 'security', 'January', 15000.0, DATE '2025-01-10', 'Security deposit', TIMESTAMP '2025-01-10 09:00:00', 'system', TIMESTAMP '2025-01-10 09:00:00', 'system'),
  (3, 2, 2, 'rent', 'February', 8000.0, DATE '2025-02-05', 'February rent', TIMESTAMP '2025-02-05 10:00:00', 'system', TIMESTAMP '2025-02-05 10:00:00', 'system'),
  (4, 2, 2, 'maintenance', 'February', 300.0, DATE '2025-02-10', 'Monthly maintenance', TIMESTAMP '2025-02-10 11:00:00', 'system', TIMESTAMP '2025-02-10 11:00:00', 'system'),
  (5, 3, 3, 'rent', 'March', 10300.0, DATE '2025-03-05', 'March rent', TIMESTAMP '2025-03-05 10:00:00', 'system', TIMESTAMP '2025-03-05 10:00:00', 'system'),
  (6, 3, 3, 'security', 'March', 30000.0, DATE '2025-03-10', 'Security deposit', TIMESTAMP '2025-03-10 09:30:00', 'system', TIMESTAMP '2025-03-10 09:30:00', 'system'),
  (7, 4, 4, 'rent', 'April', 18000.0, DATE '2025-04-05', 'April rent', TIMESTAMP '2025-04-05 10:00:00', 'system', TIMESTAMP '2025-04-05 10:00:00', 'system'),
  (8, 4, 4, 'maintenance', 'April', 400.0, DATE '2025-04-10', 'Monthly maintenance', TIMESTAMP '2025-04-10 11:00:00', 'system', TIMESTAMP '2025-04-10 11:00:00', 'system'),
  (9, 5, 5, 'rent', 'May', 18000.0, DATE '2025-05-05', 'May rent', TIMESTAMP '2025-05-05 10:00:00', 'system', TIMESTAMP '2025-05-05 10:00:00', 'system'),
  (10, 5, 5, 'security', 'May', 25000.0, DATE '2025-05-10', 'Security deposit', TIMESTAMP '2025-05-10 09:00:00', 'system', TIMESTAMP '2025-05-10 09:00:00', 'system'),
  (11, 6, 6, 'rent', 'June', 7150.0, DATE '2025-06-05', 'June rent', TIMESTAMP '2025-06-05 10:00:00', 'system', TIMESTAMP '2025-06-05 10:00:00', 'system'),
  (12, 7, 7, 'rent', 'July', 0.0, DATE '2025-07-05', 'July rent (promo)', TIMESTAMP '2025-07-05 10:00:00', 'system', TIMESTAMP '2025-07-05 10:00:00', 'system'),
  (13, 8, 8, 'rent', 'August', 0.0, DATE '2025-08-05', 'August rent (promo)', TIMESTAMP '2025-08-05 10:00:00', 'system', TIMESTAMP '2025-08-05 10:00:00', 'system'),
  (14, 9, 9, 'rent', 'September', 18750.0, DATE '2025-09-05', 'September rent', TIMESTAMP '2025-09-05 10:00:00', 'system', TIMESTAMP '2025-09-05 10:00:00', 'system'),
  (15, 10, 10, 'rent', 'October', 18000.0, DATE '2025-10-05', 'October rent', TIMESTAMP '2025-10-05 10:00:00', 'system', TIMESTAMP '2025-10-05 10:00:00', 'system'),
  (16, 10, 10, 'security', 'October', 16000.0, DATE '2025-10-10', 'Security deposit', TIMESTAMP '2025-10-10 09:00:00', 'system', TIMESTAMP '2025-10-10 09:00:00', 'system'),
  (17, 11, 11, 'rent', 'November', 20000.0, DATE '2025-11-05', 'November rent', TIMESTAMP '2025-11-05 10:00:00', 'system', TIMESTAMP '2025-11-05 10:00:00', 'system'),
  (18, 12, 12, 'rent', 'December', 22000.0, DATE '2025-12-05', 'December rent', TIMESTAMP '2025-12-05 10:00:00', 'system', TIMESTAMP '2025-12-05 10:00:00', 'system');

