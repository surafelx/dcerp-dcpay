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