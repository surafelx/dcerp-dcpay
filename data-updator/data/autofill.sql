-- INFO 
-- - PARAMETER DEFINITION
-- - TRANSACTION DEFINITION
-- - TRANSACTION CALCULATION
-- - TAX RATE
-- - MENU LEVEL


INSERT INTO parameter_definition (id, organization_id, parameter_name) VALUES ('ffc1a255-765e-4d63-af0d-1986b2425b2e', '2e688881-8e77-49a6-8601-dd718e11e438', 'Sex');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('4618d88d-436d-4799-b3d3-608e212a723d', '2e688881-8e77-49a6-8601-dd718e11e438', 'Male', 'ffc1a255-765e-4d63-af0d-1986b2425b2e');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('181b583a-cee5-4fdc-8900-ee8ab934eb94', '2e688881-8e77-49a6-8601-dd718e11e438', 'Female', 'ffc1a255-765e-4d63-af0d-1986b2425b2e');
INSERT INTO parameter_definition (id, organization_id, parameter_name) VALUES ('8f189e7d-d18f-4dde-86ea-0513a6b46e21', '2e688881-8e77-49a6-8601-dd718e11e438', 'Employee Status');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('c6c1296f-bbe7-452a-b963-bb398b104c58', '2e688881-8e77-49a6-8601-dd718e11e438', 'Active', '8f189e7d-d18f-4dde-86ea-0513a6b46e21');
INSERT INTO parameter_definition (id, organization_id, parameter_name) VALUES ('7f53b6c7-4d76-4880-a379-b84bb73cab3b', '2e688881-8e77-49a6-8601-dd718e11e438', 'Employment Type');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('2653efad-914b-478d-bd0d-07845da39030', '2e688881-8e77-49a6-8601-dd718e11e438', 'Permanent', '7f53b6c7-4d76-4880-a379-b84bb73cab3b');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('e1fb25b0-9c91-4b26-bd7d-9fd6312d66e1', '2e688881-8e77-49a6-8601-dd718e11e438', 'Temporary', '7f53b6c7-4d76-4880-a379-b84bb73cab3b');
INSERT INTO parameter_definition (id, organization_id, parameter_name) VALUES ('5bce504f-7358-4e6d-b09b-3773df2b9c2b', '2e688881-8e77-49a6-8601-dd718e11e438', 'Bank');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('553bfa97-b755-46cf-926c-d6abdae276b1', '2e688881-8e77-49a6-8601-dd718e11e438', 'CBE', '5bce504f-7358-4e6d-b09b-3773df2b9c2b');
INSERT INTO parameter_definition (id, organization_id, parameter_name) VALUES ('24026aad-481a-45e0-90cc-c6b6cde8d048', '2e688881-8e77-49a6-8601-dd718e11e438', 'Employee Department');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('4656160a-bae6-4b75-b11e-8a642a0933f8', '2e688881-8e77-49a6-8601-dd718e11e438', 'Human Resources', '24026aad-481a-45e0-90cc-c6b6cde8d048');
INSERT INTO parameter_definition (id, organization_id, parameter_name) VALUES ('11879805-f9e5-4b36-86d0-1cb38ecd10a1', '2e688881-8e77-49a6-8601-dd718e11e438', 'Employee Position');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('042b993c-7377-4dce-8a05-e906fc0e22bf', '2e688881-8e77-49a6-8601-dd718e11e438', 'Executive', '11879805-f9e5-4b36-86d0-1cb38ecd10a1');
INSERT INTO parameter_definition (id, organization_id, parameter_name) VALUES ('3aba5019-e8e5-49f1-8665-f7fc7bc757c6', '2e688881-8e77-49a6-8601-dd718e11e438', 'Transaction Type');
INSERT INTO parameter_definition (id, organization_id, parameter_name) VALUES ('0459b587-b0a4-4f0a-b362-75a0f9bd7f3a', '2e688881-8e77-49a6-8601-dd718e11e438', 'Transaction Group');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('39a1dbd2-ac77-4ce8-84e3-5e4f942fab73', '2e688881-8e77-49a6-8601-dd718e11e438', 'Loan', '0459b587-b0a4-4f0a-b362-75a0f9bd7f3a');
INSERT INTO parameter_definition (id, organization_id, parameter_name) VALUES ('ffedc24b-a05d-4111-9ad7-daa7be0a95de', '2e688881-8e77-49a6-8601-dd718e11e438', 'Calculation Unit');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('9fcd6618-9b68-4992-ac7f-f1b694ce1fe7', '2e688881-8e77-49a6-8601-dd718e11e438', 'Hourly', 'ffedc24b-a05d-4111-9ad7-daa7be0a95de');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('f21a9b73-57c0-469f-b558-20038d475136', '2e688881-8e77-49a6-8601-dd718e11e438', 'Monthly', 'ffedc24b-a05d-4111-9ad7-daa7be0a95de');
INSERT INTO parameter_definition (id, organization_id, parameter_name) VALUES ('c51d906f-b7c0-4114-9418-3bb71889a255', '2e688881-8e77-49a6-8601-dd718e11e438', 'Transaction Calculation');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('af5af51b-9508-49ac-9883-9be20eb893f4', '2e688881-8e77-49a6-8601-dd718e11e438', '*', 'c51d906f-b7c0-4114-9418-3bb71889a255');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('1a638418-66c7-41ba-9a3a-3c8d5837d7c9', '2e688881-8e77-49a6-8601-dd718e11e438', '=', 'c51d906f-b7c0-4114-9418-3bb71889a255');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('e647157e-6268-40b0-9639-10dd1e7eb63f', '2e688881-8e77-49a6-8601-dd718e11e438', 'Absence', '0459b587-b0a4-4f0a-b362-75a0f9bd7f3a');
INSERT INTO parameter_definition (id, organization_id, parameter_name) VALUES ('7244a8c1-1baf-4fb4-8170-79a06822ed7c', '2e688881-8e77-49a6-8601-dd718e11e438', 'Transaction Update Type');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id)  VALUES ('e1b1b6f1-9344-49a3-8b01-2afc168d1c84', '2e688881-8e77-49a6-8601-dd718e11e438', 'Input', '7244a8c1-1baf-4fb4-8170-79a06822ed7c');
INSERT INTO parameter_definition (id, organization_id, parameter_name,  parent_parameter_id) VALUES ('b043ae6a-1879-4569-846e-66258ac306ba', '2e688881-8e77-49a6-8601-dd718e11e438', 'Calculation', '7244a8c1-1baf-4fb4-8170-79a06822ed7c');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('b5161710-171b-4ec3-b4b4-54e584bf11ef', '2e688881-8e77-49a6-8601-dd718e11e438', 'Deduction Quantity', '3aba5019-e8e5-49f1-8665-f7fc7bc757c6');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('cd1d36c3-b088-49ba-99f7-968fa453a979', '2e688881-8e77-49a6-8601-dd718e11e438', 'Membership', '0459b587-b0a4-4f0a-b362-75a0f9bd7f3a');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('27355723-c66c-4d00-85fd-a3719e6c9262', '2e688881-8e77-49a6-8601-dd718e11e438', 'NA', '3aba5019-e8e5-49f1-8665-f7fc7bc757c6');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('6ff5885e-0f8f-4822-989d-a779af465221', '2e688881-8e77-49a6-8601-dd718e11e438', 'NA', '0459b587-b0a4-4f0a-b362-75a0f9bd7f3a');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('19229286-d954-4aca-b39b-8ecc69e14fe4', '2e688881-8e77-49a6-8601-dd718e11e438', 'Earning Amount', '3aba5019-e8e5-49f1-8665-f7fc7bc757c6');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('f6a95135-b2f4-44d4-95cf-ec0603491d89', '2e688881-8e77-49a6-8601-dd718e11e438', 'Earning Quantity', '3aba5019-e8e5-49f1-8665-f7fc7bc757c6');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('93819963-c591-4b84-a1de-344be30044b9', '2e688881-8e77-49a6-8601-dd718e11e438', 'Daily', 'ffedc24b-a05d-4111-9ad7-daa7be0a95de');
INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ('8cee3a00-8a21-4279-950e-e51a9f75ccf2', '2e688881-8e77-49a6-8601-dd718e11e438', 'Deduction Amount', '3aba5019-e8e5-49f1-8665-f7fc7bc757c6');

INSERT INTO transaction_definition (id, organization_id, branch_id, transaction_code, transaction_name, short_name, transaction_type, update_type, permanent, taxable, un_taxable_limit, affect_by_leave, leave_days, affect_back_payroll, affect_beneficiary, transaction_group, gl_entry_by, direct_account, contract_gl_account)
VALUES ('7ae1323b-6213-43e4-9a65-a5aa34a89aae', '2e688881-8e77-49a6-8601-dd718e11e438', '8b50dfcb-7b6d-4f01-9678-731f4e50cde3', '1', 'Absence Amount', 'ABA', '8cee3a00-8a21-4279-950e-e51a9f75ccf2', 'b043ae6a-1879-4569-846e-66258ac306ba', true, false, '', true, '', false, true, 'e647157e-6268-40b0-9639-10dd1e7eb63f', 'total', '1000', '1000');
INSERT INTO transaction_definition (id, organization_id, branch_id, transaction_code, transaction_name, short_name, transaction_type, update_type, permanent, taxable, un_taxable_limit, affect_by_leave, leave_days, affect_back_payroll, affect_beneficiary, transaction_group, gl_entry_by, direct_account, contract_gl_account)
VALUES ('cd7183d7-4e04-4012-aa7c-3820875a807a', '2e688881-8e77-49a6-8601-dd718e11e438', '8b50dfcb-7b6d-4f01-9678-731f4e50cde3', '2', 'Absence Days', 'ABD', 'b5161710-171b-4ec3-b4b4-54e584bf11ef', 'e1b1b6f1-9344-49a3-8b01-2afc168d1c84', true, false, '', false, '', false, false, 'e647157e-6268-40b0-9639-10dd1e7eb63f', '', '1000', '1000');
INSERT INTO transaction_definition (id, organization_id, branch_id, transaction_code, transaction_name, short_name, transaction_type, update_type, permanent, taxable, un_taxable_limit, affect_by_leave, leave_days, affect_back_payroll, affect_beneficiary, transaction_group, gl_entry_by, direct_account, contract_gl_account)
VALUES ('5cf05cf1-dbce-4704-9932-08844135a20d', '2e688881-8e77-49a6-8601-dd718e11e438', '8b50dfcb-7b6d-4f01-9678-731f4e50cde3', '3', 'Cost Sharing', 'CS', '8cee3a00-8a21-4279-950e-e51a9f75ccf2', 'b043ae6a-1879-4569-846e-66258ac306ba', true, false, '', false, '', false, false, 'cd1d36c3-b088-49ba-99f7-968fa453a979', '', '1000', '1000');
INSERT INTO transaction_definition (id, organization_id, branch_id, transaction_code, transaction_name, short_name, transaction_type, update_type, permanent, taxable, un_taxable_limit, affect_by_leave, leave_days, affect_back_payroll, affect_beneficiary, transaction_group, gl_entry_by, direct_account, contract_gl_account)
VALUES ('479a029f-b073-446a-bd63-92c49830457a', '2e688881-8e77-49a6-8601-dd718e11e438', '8b50dfcb-7b6d-4f01-9678-731f4e50cde3', '4', 'Loan', 'L', '8cee3a00-8a21-4279-950e-e51a9f75ccf2', 'e1b1b6f1-9344-49a3-8b01-2afc168d1c84', false, false, '', false, '', false, false, '39a1dbd2-ac77-4ce8-84e3-5e4f942fab73', '', '1000', '1000');
INSERT INTO transaction_definition (id, organization_id, branch_id, transaction_code, transaction_name, short_name, transaction_type, update_type, permanent, taxable, un_taxable_limit, affect_by_leave, leave_days, affect_back_payroll, affect_beneficiary, transaction_group, gl_entry_by, direct_account, contract_gl_account)
VALUES ('96fd0651-aef6-4a02-b234-cba24a51faac', '2e688881-8e77-49a6-8601-dd718e11e438', '8b50dfcb-7b6d-4f01-9678-731f4e50cde3', '5', 'Basic Salary', 'BS', '19229286-d954-4aca-b39b-8ecc69e14fe4', 'e1b1b6f1-9344-49a3-8b01-2afc168d1c84', false, false, '', false, '', false, false, '6ff5885e-0f8f-4822-989d-a779af465221', '', '', '');
INSERT INTO transaction_definition  (id, organization_id, branch_id, transaction_code, transaction_name, short_name, transaction_type, update_type, permanent, taxable, un_taxable_limit, affect_by_leave, leave_days, affect_back_payroll, affect_beneficiary, transaction_group, gl_entry_by, direct_account, contract_gl_account)
VALUES ('085f92e9-1511-46ce-8193-459f340a242f', '2e688881-8e77-49a6-8601-dd718e11e438', '8b50dfcb-7b6d-4f01-9678-731f4e50cde3', '6', 'None', 'NA', '27355723-c66c-4d00-85fd-a3719e6c9262', 'e1b1b6f1-9344-49a3-8b01-2afc168d1c84', false, false, '', false, '', false, false, '6ff5885e-0f8f-4822-989d-a779af465221', '', '', '');

INSERT INTO transaction_calculation (id, first_transaction_id, second_transaction_id, third_transaction_id, calculation_unit, first_option, second_option, rate)
VALUES ('0d7e8b99-0595-4b9b-beb9-a1cf72b67664', '7ae1323b-6213-43e4-9a65-a5aa34a89aae', '96fd0651-aef6-4a02-b234-cba24a51faac', 'cd7183d7-4e04-4012-aa7c-3820875a807a', '93819963-c591-4b84-a1de-344be30044b9', 'af5af51b-9508-49ac-9883-9be20eb893f4', 'af5af51b-9508-49ac-9883-9be20eb893f4', 1);
INSERT INTO transaction_calculation (id, first_transaction_id, second_transaction_id, third_transaction_id, calculation_unit, first_option, second_option, rate)
VALUES ('ee0a4ab3-65f7-41ec-870a-ab6289640529', '5cf05cf1-dbce-4704-9932-08844135a20d', '96fd0651-aef6-4a02-b234-cba24a51faac', '085f92e9-1511-46ce-8193-459f340a242f', 'f21a9b73-57c0-469f-b558-20038d475136', '1a638418-66c7-41ba-9a3a-3c8d5837d7c9', '1a638418-66c7-41ba-9a3a-3c8d5837d7c9', 1000);





