
CREATE TABLE organizations (
		id VARCHAR(40) NOT NULL UNIQUE,
		organization_name TEXT NOT NULL UNIQUE
	);

CREATE TABLE menu_items (
  id VARCHAR(40) NOT NULL UNIQUE,
  organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
  menu_code VARCHAR(40), 
  parent_id VARCHAR(40),
  menu_title VARCHAR(50) NOT NULL,
  menu_path VARCHAR(100) NOT NULL,
  icon VARCHAR(50), -- Adding the icon column with a string data type
  CONSTRAINT fk_parent_menu_item
    FOREIGN KEY (parent_id)
    REFERENCES menu_items (id)
);


CREATE TABLE periods (
		id VARCHAR(40) NOT NULL UNIQUE,
		organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
		period_count TEXT NOT NULL,
		period_name TEXT NOT NULL,
		period_year TEXT NOT NULL,
		month_name TEXT NOT NULL,
		start_date DATE NOT NULL,
		end_date DATE NOT NULL,
		period_paid BOOLEAN NOT NULL,
		period_current BOOLEAN NOT NULL,
		period_back BOOLEAN NOT NULL,
		period_proof BOOLEAN NOT NULL,
		period_final BOOLEAN NOT NULL,
		period_report BOOLEAN NOT NULL,
		period_process BOOLEAN NOT NULL
	);

CREATE TABLE branch (
		id VARCHAR(40) NOT NULL UNIQUE,
		organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
		branch_code VARCHAR(255) NOT NULL,
		branch_name VARCHAR(255) NOT NULL
	);

CREATE TABLE user_roles (
		id VARCHAR(40) NOT NULL UNIQUE,
		organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
		branch_id VARCHAR(40) NOT NULL REFERENCES branch(id),
		role_name TEXT NOT NULL
	);

CREATE TABLE user_accounts (
	    id VARCHAR(40) NOT NULL UNIQUE,
		first_name TEXT NOT NULL ,
		last_name TEXT NOT NULL ,
		email TEXT NOT NULL UNIQUE ,
		organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
		password TEXT NOT NULL 
    );


CREATE TABLE holiday (
	    id VARCHAR(40) NOT NULL UNIQUE,
		organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
		branch_id VARCHAR(40) NOT NULL REFERENCES branch(id),
		holiday_name TEXT NOT NULL,
		holiday_date DATE NOT NULL
);


CREATE TABLE role_user (
    id VARCHAR(40) NOT NULL UNIQUE,
    user_id VARCHAR(40) NOT NULL REFERENCES user_accounts(id),
    role_id VARCHAR(40) NOT NULL REFERENCES user_roles(id)
);

CREATE TABLE role_branch (
    id VARCHAR(40) NOT NULL UNIQUE,
    role_id VARCHAR(40) NOT NULL REFERENCES user_roles(id),
    branch_id VARCHAR(40) NOT NULL REFERENCES branch(id),
	allowed boolean NOT NULL
);


CREATE TABLE role_menu (
    id VARCHAR(40) NOT NULL UNIQUE,
    role_id VARCHAR(40) NOT NULL REFERENCES user_roles(id),
    menu_id VARCHAR(40) NOT NULL REFERENCES menu_items(id),
	edit_allowed boolean NOT NULL,
	read_allowed boolean NOT NULL
);



	CREATE TABLE user_rights (
		id VARCHAR(40) NOT NULL UNIQUE,
		right_name VARCHAR(40) NOT NULL,
		route_name VARCHAR(40) NOT NULL,
		organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id)
	);

	CREATE TABLE roles_rights (
		id VARCHAR(40) NOT NULL UNIQUE,
		roles_id VARCHAR(40) NOT NULL REFERENCES user_roles(id),
		rights_id  VARCHAR(40) NOT NULL REFERENCES user_rights(id),
		right_read boolean  NOT NULL,
		right_edit boolean NOT NULL
	);


	CREATE TABLE navigation (
		id VARCHAR(40) NOT NULL UNIQUE,
		title VARCHAR(255) NOT NULL,
		path VARCHAR(255),
		icon VARCHAR(255),
		parent_id VARCHAR(255)
	);



CREATE TABLE department (
		id VARCHAR(40) NOT NULL UNIQUE,
		organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
		branch_id VARCHAR(40) NOT NULL REFERENCES branch(id),
		department_code VARCHAR(255) NOT NULL,
		department_name VARCHAR(255) NOT NULL,
		permanent_account VARCHAR(255) NOT NULL,
		contract_account VARCHAR(255) NOT NULL
);


CREATE TABLE parameter_definition (
id VARCHAR(40) NOT NULL UNIQUE,
  organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
  parameter_name VARCHAR(50) NOT NULL,
  parent_parameter_id VARCHAR(40),
  CONSTRAINT fk_parent_parameter
    FOREIGN KEY (parent_parameter_id)
    REFERENCES parameter_definition (id)
);

CREATE TABLE employee ( 
		id VARCHAR(40) NOT NULL UNIQUE,
		organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
		branch_id VARCHAR(40) NOT NULL REFERENCES branch(id),
		department_id VARCHAR(40) NOT NULL REFERENCES department(id),
		employee_code VARCHAR(40) NOT NULL,
		employee_title VARCHAR(40) NOT NULL REFERENCES parameter_definition(id),
		first_name VARCHAR(40) NOT NULL,
		middle_name VARCHAR(40) NOT NULL,
		last_name VARCHAR(40) NOT NULL,
		sex VARCHAR(40) NOT NULL,
		employee_status VARCHAR(40) NOT NULL REFERENCES parameter_definition(id),
		employee_type VARCHAR(40) NOT NULL REFERENCES parameter_definition(id),
		employment_date DATE,
		contract_start_date DATE,
		contract_end_date DATE,
		monthly_working_hours VARCHAR(40) NOT NULL,
		pension_status BOOLEAN NOT NULL,
		pension_number VARCHAR(40),
	employee_bank VARCHAR(40) NOT NULL REFERENCES parameter_definition(id),
  		employee_account_number VARCHAR(50),
		tin_number VARCHAR(40),
		working_days VARCHAR(40),
		employee_position VARCHAR(40) NOT NULL REFERENCES parameter_definition(id)
);





CREATE TABLE transaction_definition (
	    id VARCHAR(40) NOT NULL UNIQUE,
		organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
		branch_id VARCHAR(40) NOT NULL REFERENCES branch(id),
		transaction_code VARCHAR(40) NOT NULL,
		transaction_name VARCHAR(40) NOT NULL,
		short_name VARCHAR(40) NOT NULL,
		transaction_type VARCHAR(40) NOT NULL REFERENCES parameter_definition(id),
		update_type VARCHAR(40) NOT NULL REFERENCES parameter_definition(id),
		permanent boolean  NOT NULL,
		taxable boolean  NOT NULL,
		un_taxable_limit VARCHAR(40) NOT NULL,
		affect_by_leave boolean  NOT NULL,
		leave_days VARCHAR(40) NOT NULL,
		affect_back_payroll boolean  NOT NULL,
		affect_beneficiary boolean  NOT NULL,
		transaction_group VARCHAR(40) NOT NULL REFERENCES parameter_definition(id),
		gl_entry_by VARCHAR(40) NOT NULL,
		direct_account VARCHAR(40) NOT NULL,
		contract_gl_account VARCHAR(40) NOT NULL
);

CREATE TABLE loan_transaction (
	id VARCHAR(40) NOT NULL UNIQUE,
	organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
	employee_id VARCHAR(40) NOT NULL REFERENCES employee(id),
	transaction_id VARCHAR(40) NOT NULL REFERENCES transaction_definition(id),
	total_loan VARCHAR(40) NOT NULL,
	transaction_amount VARCHAR(40) NOT NULL,
	remaining_balance VARCHAR(40) NOT NULL
);

CREATE TABLE pay_transaction (
	id VARCHAR(40) NOT NULL UNIQUE,
	organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
	employee_id VARCHAR(40) NOT NULL REFERENCES employee(id),
	period_id VARCHAR(40) NOT NULL REFERENCES periods(id),
	transaction_id VARCHAR(40) NOT NULL REFERENCES transaction_definition(id),
	transaction_amount VARCHAR(40) NOT NULL
);

CREATE TABLE membership(
	id VARCHAR(40) NOT NULL UNIQUE,
	organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
	employee_id VARCHAR(40) NOT NULL REFERENCES employee(id),
	transaction_id VARCHAR(40) NOT NULL REFERENCES transaction_definition(id)
);


CREATE TABLE discontinuation(
	id VARCHAR(40) NOT NULL UNIQUE,
	reference_number VARCHAR(40) NOT NULL,
	organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
	employee_id VARCHAR(40) NOT NULL REFERENCES employee(id),
	action_type VARCHAR(40) NOT NULL REFERENCES parameter_definition(id),
	discontinuation_date DATE NOT NULL
);

CREATE TABLE transaction_calculation (
		id VARCHAR(40) NOT NULL UNIQUE,
		organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
		first_transaction_id  VARCHAR(40) NOT NULL REFERENCES transaction_definition(id),
		second_transaction_id  VARCHAR(40) NOT NULL REFERENCES transaction_definition(id),
		third_transaction_id  VARCHAR(40) NOT NULL REFERENCES transaction_definition(id),
		calculation_unit VARCHAR(40) NOT NULL REFERENCES parameter_definition(id),
		first_option VARCHAR(40) NOT NULL REFERENCES parameter_definition(id),
		second_option VARCHAR(40) NOT NULL REFERENCES parameter_definition(id),
		rate FLOAT NOT NULL
);

CREATE TABLE tax_rate (
	id VARCHAR(40) NOT NULL UNIQUE,
	organization_id VARCHAR(40) NOT NULL,
	tax_rate_code VARCHAR(40) NOT NULL,
	lowest_range VARCHAR(40) NOT NULl,
	highest_range VARCHAR(40) NOT NULL,
	tax_rate VARCHAR(40) NOT NULL
);

CREATE TABLE period_transactions (
	id VARCHAR(40) NOT NULL UNIQUE,
	organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
	period_id VARCHAR(40) NOT NULL REFERENCES periods(id),
	employee_id VARCHAR(40) NOT NULL REFERENCES employee(id),
	transaction_id VARCHAR(40) NOT NULL REFERENCES transaction_definition(id),
	transaction_amount VARCHAR(40) NOT NULL,
	transaction_affected_amount VARCHAR(40) NOT NULL,
	transaction_printed_flag BOOLEAN NOT NULL,
	transaction_user_id VARCHAR(40) NOT NULL REFERENCES user_accounts(id),
	transaction_record_number VARCHAR(40) NOT NULL,
	transaction_date DATE NOT NULL
);

CREATE TABLE processed_transactions (
	id VARCHAR(40) NOT NULL UNIQUE,
	organization_id VARCHAR(40) NOT NULL REFERENCES organizations(id),
	period_id VARCHAR(40) NOT NULL REFERENCES periods(id),
	employee_id VARCHAR(40) NOT NULL REFERENCES employee(id),
	transaction_id VARCHAR(40) NOT NULL REFERENCES transaction_definition(id),
	transaction_amount VARCHAR(40) NOT NULL,
	transaction_affected_amount VARCHAR(40) NOT NULL,
	transaction_printed_flag BOOLEAN NOT NULL,
	transaction_user_id VARCHAR(40) NOT NULL REFERENCES user_accounts(id),
	transaction_record_number VARCHAR(40) NOT NULL,
	transaction_date DATE NOT NULL
);

