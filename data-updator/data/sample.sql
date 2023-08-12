-- INFO 
-- - DEFAULT COMPANY ID 2e688881-8e77-49a6-8601-dd718e11e438
-- - DEFAULT PERIOD ID a51a1615-9e8d-46f4-b707-e01d8c6ee47f
-- - ADMIN ROLE ID 78623c3a-d5f7-4e60-90dd-e9fec1154353



INSERT INTO organizations(id, organization_name) VALUES 
('2e688881-8e77-49a6-8601-dd718e11e438', 'DC PAYROLL');

INSERT INTO branch(id, organization_id, branch_code, branch_name) VALUES 
('8b50dfcb-7b6d-4f01-9678-731f4e50cde3', '2e688881-8e77-49a6-8601-dd718e11e438', 1, 'Mexico');


INSERT INTO user_roles(id, organization_id, branch_id, role_name) VALUES 
('78623c3a-d5f7-4e60-90dd-e9fec1154353','2e688881-8e77-49a6-8601-dd718e11e438', '8b50dfcb-7b6d-4f01-9678-731f4e50cde3', 'Admin');


INSERT INTO user_accounts(id, first_name, last_name, email, organization_id, password) 
VALUES (
'c88258fa-53fe-4ed0-8b86-67d888b06b0e', 
'Abebe', 
'Balcha', 
'abebebalcha@gmail.com', 
'2e688881-8e77-49a6-8601-dd718e11e438',
'$2b$10$4Sji3oQdqfS2iNU921XvBOuzukkNbI5YA78kQum7MF06a3pHkOdDS'
) RETURNING id;


INSERT INTO role_branch(id, role_id, branch_id, allowed) 
VALUES (
'e9b43f55-d408-4ed1-870d-f9af72667058',
'78623c3a-d5f7-4e60-90dd-e9fec1154353',
'8b50dfcb-7b6d-4f01-9678-731f4e50cde3',
true
) RETURNING id;


INSERT INTO role_user(id, user_id, role_id) 
VALUES (
    'e9b43f55-d408-4ed1-870d-f9af72667058',
    'c88258fa-53fe-4ed0-8b86-67d888b06b0e', 
    '78623c3a-d5f7-4e60-90dd-e9fec1154353'
) RETURNING id;

-- September
INSERT INTO periods (id, organization_id, period_count, period_name, period_year, month_name, start_date, end_date, period_paid, period_current, period_back, period_proof, period_final, period_report, period_process)
VALUES ('1', '2e688881-8e77-49a6-8601-dd718e11e438', '1', 'September', '2023', 'September', '2023-09-01', '2023-09-30', false, false, false, false, false, false, false);

-- October
INSERT INTO periods (id, organization_id, period_count, period_name, period_year, month_name, start_date, end_date, period_paid, period_current, period_back, period_proof, period_final, period_report, period_process)
VALUES ('2', '2e688881-8e77-49a6-8601-dd718e11e438', '2', 'October', '2023', 'October', '2023-10-01', '2023-10-31', false, false, false, false, false, false, false);

-- November
INSERT INTO periods (id, organization_id, period_count, period_name, period_year, month_name, start_date, end_date, period_paid, period_current, period_back, period_proof, period_final, period_report, period_process)
VALUES ('3', '2e688881-8e77-49a6-8601-dd718e11e438', '3', 'November', '2023', 'November', '2023-11-01', '2023-11-30', false, false, false, false, false, false, false);

-- December
INSERT INTO periods (id, organization_id, period_count, period_name, period_year, month_name, start_date, end_date, period_paid, period_current, period_back, period_proof, period_final, period_report, period_process)
VALUES ('4', '2e688881-8e77-49a6-8601-dd718e11e438', '4', 'December', '2023', 'December', '2023-12-01', '2023-12-31', false, false, false, false, false, false, false);

-- January
INSERT INTO periods (id, organization_id, period_count, period_name, period_year, month_name, start_date, end_date, period_paid, period_current, period_back, period_proof, period_final, period_report, period_process)
VALUES ('5', '2e688881-8e77-49a6-8601-dd718e11e438', '5', 'January', '2024', 'January', '2024-01-01', '2024-01-31', false, false, false, false, false, false, false);

-- February
INSERT INTO periods (id, organization_id, period_count, period_name, period_year, month_name, start_date, end_date, period_paid, period_current, period_back, period_proof, period_final, period_report, period_process)
VALUES ('6', '2e688881-8e77-49a6-8601-dd718e11e438', '6', 'February', '2024', 'February', '2024-02-01', '2024-02-29', false, false, false, false, false, false, false);

-- March
INSERT INTO periods (id, organization_id, period_count, period_name, period_year, month_name, start_date, end_date, period_paid, period_current, period_back, period_proof, period_final, period_report, period_process)
VALUES ('7', '2e688881-8e77-49a6-8601-dd718e11e438', '7', 'March', '2024', 'March', '2024-03-01', '2024-03-31', false, false, false, false, false, false, false);

-- April
INSERT INTO periods (id, organization_id, period_count, period_name, period_year, month_name, start_date, end_date, period_paid, period_current, period_back, period_proof, period_final, period_report, period_process)
VALUES ('8', '2e688881-8e77-49a6-8601-dd718e11e438', '8', 'April', '2024', 'April', '2024-04-01', '2024-04-30', false, false, false, false, false, false, false);

-- May
INSERT INTO periods (id, organization_id, period_count, period_name, period_year, month_name, start_date, end_date, period_paid, period_current, period_back, period_proof, period_final, period_report, period_process)
VALUES ('9', '2e688881-8e77-49a6-8601-dd718e11e438', '9', 'May', '2024', 'May', '2024-05-01', '2024-05-31', false, false, false, false, false, false, false);

-- June
INSERT INTO periods (id, organization_id, period_count, period_name, period_year, month_name, start_date, end_date, period_paid, period_current, period_back, period_proof, period_final, period_report, period_process)
VALUES ('10', '2e688881-8e77-49a6-8601-dd718e11e438', '10', 'June', '2024', 'June', '2024-06-01', '2024-06-30', false, true, false, false, false, false, false);

-- July
INSERT INTO periods (id, organization_id, period_count, period_name, period_year, month_name, start_date, end_date, period_paid, period_current, period_back, period_proof, period_final, period_report, period_process)
VALUES ('11', '2e688881-8e77-49a6-8601-dd718e11e438', '11', 'July', '2024', 'July', '2024-07-01', '2024-07-31', false, false, false, false, false, false, false);

-- August
INSERT INTO periods (id, organization_id, period_count, period_name, period_year, month_name, start_date, end_date, period_paid, period_current, period_back, period_proof, period_final, period_report, period_process)
VALUES ('12', '2e688881-8e77-49a6-8601-dd718e11e438', '12', 'August', '2024', 'August', '2024-08-01', '2024-08-31', false, false, false, false, false, false, false);
