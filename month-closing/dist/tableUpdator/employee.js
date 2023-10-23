"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubParameterIdByNameByOrganization = exports.getDepartmentByName = exports.getBranchByName = exports.create = exports.createPayTransaction = exports.createPT = exports.getByNameAndOrganization = void 0;
const fs = require('fs');
const pool_1 = __importDefault(require("../config/pool"));
const uuid_1 = require("uuid");
const csv_parser_1 = __importDefault(require("csv-parser"));
const moment_1 = __importDefault(require("moment"));
const MANAGEMENT_GROUP_BRANCH = '1';
const COMMERCE_AND_FINANCE_BRANCH = '2';
const PRODUCTION_OPERATION_BRANCH = '3';
const CONTRACT_EMPLOYEE_BRANCH = '4';
const ALL_BRANCH = '99';
const MANAGEMENT_DEPARTMENT = '101';
const FINANCE_DEPARTMENT = '201';
const FABRICATION_DEPARTMENT = '301';
const CONTRACT_DEPARTMENT = '401';
const MARKETING_DEPARTMENT = '202';
const TENDER_AND_QUOTATION_DEPARTMENT = '102';
const MACHINE_SHOP_DEPARTMENT = '302';
const ALL_MANUFACTURING_SUPPORTER = '303';
const MANAGEMENT_POSITION = '4001';
const EMPLOYEE_POSITION = '4002';
const MALE_SEX = '1002';
const FEMALE_SEX = '1001';
const PERMANENT_TYPE = '2001';
const CONTRACT_TYPE = '2002';
const ACTIVE_STATUS = '14001';
const SUSPENDED_STATUS = '14002';
const TERMINATED_STATUS = '14003';
const getByNameAndOrganization = async (organizationId, transactionName) => {
    const { rows: employees } = await pool_1.default.query(`
    SELECT 
    transaction_definition.id,
    transaction_definition.organization_id,
    transaction_definition.branch_id,
    transaction_definition.transaction_code,
    transaction_definition.transaction_name,
    transaction_definition.short_name,
    transaction_definition.transaction_type,
    transaction_definition.update_type,
    transaction_definition.permanent,
    transaction_definition.taxable,
    transaction_definition.un_taxable_limit,
    transaction_definition.affect_by_leave,
    transaction_definition.leave_days,
    transaction_definition.affect_back_payroll,
    transaction_definition.affect_beneficiary,
    transaction_definition.transaction_group,
    transaction_definition.gl_entry_by,
    transaction_definition.direct_account,
    transaction_definition.contract_gl_account,
    pd1.parameter_name as transaction_type_name,
    pd2.parameter_name as transaction_group_name,
    pd3.parameter_name as update_type_name
    FROM transaction_definition
    INNER JOIN parameter_definition pd1 ON transaction_definition.transaction_type = pd1.id
    INNER JOIN parameter_definition pd2 ON transaction_definition.transaction_group = pd2.id
    INNER JOIN parameter_definition pd3 ON transaction_definition.update_type = pd3.id
    WHERE transaction_definition.organization_id=$1 AND
    transaction_definition.transaction_name = $2`, [organizationId, transactionName]);
    return employees[0];
};
exports.getByNameAndOrganization = getByNameAndOrganization;
const createPT = async (newMenu) => {
    const id = (0, uuid_1.v4)();
    const { employeeId, transactionId, transactionAmount } = newMenu;
    const query = `
	INSERT INTO 
        pay_transaction 
        (
            id,
            employee_id,
            transaction_id,
            transaction_amount 
            ) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    const res = await pool_1.default.query(query, [
        id,
        employeeId,
        transactionId,
        transactionAmount
    ]);
    return res.rows[0];
};
exports.createPT = createPT;
const createPayTransaction = async (employee) => {
    const basicSalaryId = await (0, exports.getByNameAndOrganization)(employee.organizationId, 'Basic Salary');
    const calculatedSalary = employee.workingDays == 0 ? employee.basicSalary : (employee.basicSalary * employee.workingDays) / 30;
    await (0, exports.createPT)({ employeeId: employee.id, transactionId: basicSalaryId?.id, transactionAmount: calculatedSalary });
};
exports.createPayTransaction = createPayTransaction;
const create = async (newMenu) => {
    const id = (0, uuid_1.v4)();
    const { organizationId, employeeCode, employeeTitle, contractStartDate, contractEndDate, employmentDate, firstName, middleName, lastName, sex, employeeStatus, employeeType, monthlyWorkingHours, pensionStatus, pensionNumber, tinNumber, workingDays, employeeBranch, employeeDepartment, employeePosition } = newMenu;
    const refactoredEmpDate = !employmentDate ? null : new Date(employmentDate);
    const refactoredContEnd = !contractEndDate ? null : new Date(contractEndDate);
    const refactoredContStart = !contractStartDate ? null : new Date(contractStartDate);
    const employeePensionStatus = pensionStatus == 'TRUE' ? true : false;
    const query = `
	INSERT INTO 
        employee 
        (
            id,
            organization_id,
            branch_id,
            department_id,
            employee_code,
            employee_title,
            first_name,
            middle_name,
            last_name,
            sex,
            employee_status,
            employee_type,
            employment_date, 
            contract_start_date,
            contract_end_date,
            monthly_working_hours,
            pension_status,
            pension_number,
            tin_number,
            working_days,
            employee_position
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
    RETURNING *;
    `;
    const res = await pool_1.default.query(query, [
        id,
        organizationId,
        employeeBranch,
        employeeDepartment,
        employeeCode,
        employeeTitle,
        firstName,
        middleName,
        lastName,
        sex,
        employeeStatus,
        employeeType,
        refactoredEmpDate,
        refactoredContStart,
        refactoredContEnd,
        monthlyWorkingHours,
        employeePensionStatus,
        pensionNumber,
        tinNumber,
        workingDays,
        employeePosition
    ]);
    const branch = res.rows[0];
    return branch;
};
exports.create = create;
const getBranchByName = async (branchName) => {
    const query = `
	SELECT
        *
    FROM 
    branch WHERE
    branch_name=$1
    `;
    const res = await pool_1.default.query(query, [
        branchName
    ]);
    const branch = res.rows[0];
    return branch;
};
exports.getBranchByName = getBranchByName;
const getDepartmentByName = async (branchName) => {
    const query = `
	SELECT
        *
    FROM 
    department WHERE
    department_name=$1
    `;
    const res = await pool_1.default.query(query, [
        branchName
    ]);
    const branch = res.rows[0];
    return branch;
};
exports.getDepartmentByName = getDepartmentByName;
const getSubParameterIdByNameByOrganization = async (organizationId, parentParameterName, parameterName) => {
    const { rows: parameterQueryResponse } = await pool_1.default.query(`
    SELECT pd.id
    FROM parameter_definition pd
    INNER JOIN parameter_definition parent_pd ON pd.parent_parameter_id = parent_pd.id
    WHERE parent_pd.parameter_name = $1
    AND pd.parameter_name = $2
    AND pd.organization_id = $3;

    `, [parentParameterName, parameterName, organizationId]);
    return parameterQueryResponse[0].id;
};
exports.getSubParameterIdByNameByOrganization = getSubParameterIdByNameByOrganization;
const processCSV = async (organizationId, csvFile) => {
    try {
        const resultArray = [];
        const processRow = (row) => {
            const employeeCode = row['Empcode'];
            const empGender = row['EmpGender'];
            const empType = row['EmpType'];
            const empStatus = row['EmpStatus'];
            const empContStart = row['EmpContstartDate'];
            const empContEnd = row['EmpContEndDate'];
            const empDate = row['EmpDate'];
            const workingDays = row['EmpMonthlyWrdays'];
            const monthlyWorkingHours = row['EmpMonthlyWrHours'];
            const tinNumber = row['EmpTINNO'];
            const branchCode = row['EmpBranch'];
            const departmentCode = row['Empdepartment'];
            const empPosition = row['EmpPosition'];
            const basicSalary = row['EmpBasicSalary'];
            const firstName = row['Empname'];
            const middleName = '';
            const lastName = '';
            const pensionNumber = row['Emppensionno'];
            const pensionStatus = row['EmpPension'];
            const employee = {
                employeeCode,
                empGender,
                empType,
                empStatus,
                contractStartDate: !empContStart ? null : (0, moment_1.default)(empContStart, 'MM/DD/YYYY'),
                contractEndDate: !empContEnd ? null : (0, moment_1.default)(empContEnd, 'MM/DD/YYYY'),
                employmentDate: !empDate ? null : (0, moment_1.default)(empDate, 'MM/DD/YYYY'),
                workingDays,
                tinNumber,
                branchCode,
                departmentCode,
                empPosition,
                monthlyWorkingHours,
                pensionStatus,
                basicSalary,
                firstName,
                middleName,
                lastName,
                pensionNumber
            };
            resultArray.push(employee);
        };
        const fileStream = await fs.createReadStream(csvFile);
        await new Promise((resolve, reject) => {
            fileStream
                .pipe((0, csv_parser_1.default)())
                .on('data', (row) => {
                processRow(row);
            })
                .on('end', async () => {
                for (const employee of resultArray) {
                    try {
                        if (employee.branchCode == MANAGEMENT_GROUP_BRANCH) {
                            const branch = await (0, exports.getBranchByName)('Management Group');
                            employee.employeeBranch = branch.id;
                        }
                        if (employee.branchCode == COMMERCE_AND_FINANCE_BRANCH) {
                            const branch = await (0, exports.getBranchByName)('Commerce and Finance');
                            employee.employeeBranch = branch.id;
                        }
                        if (employee.branchCode == PRODUCTION_OPERATION_BRANCH) {
                            const branch = await (0, exports.getBranchByName)('Production Operation');
                            employee.employeeBranch = branch.id;
                        }
                        if (employee.branchCode == CONTRACT_EMPLOYEE_BRANCH) {
                            const branch = await (0, exports.getBranchByName)('Contract Employee');
                            employee.employeeBranch = branch.id;
                        }
                        if (employee.branchCode == ALL_BRANCH) {
                            const branch = await (0, exports.getBranchByName)('All');
                            employee.employeeBranch = branch.id;
                        }
                        if (employee.departmentCode == MANAGEMENT_DEPARTMENT) {
                            const department = await (0, exports.getDepartmentByName)('Management');
                            employee.employeeDepartment = department.id;
                        }
                        if (employee.departmentCode == FINANCE_DEPARTMENT) {
                            const department = await (0, exports.getDepartmentByName)('Finance ');
                            employee.employeeDepartment = department.id;
                        }
                        if (employee.departmentCode == FABRICATION_DEPARTMENT) {
                            const department = await (0, exports.getDepartmentByName)('Fabrication');
                            employee.employeeDepartment = department.id;
                        }
                        if (employee.departmentCode == CONTRACT_DEPARTMENT) {
                            const department = await (0, exports.getDepartmentByName)('Contract ');
                            employee.employeeDepartment = department.id;
                        }
                        if (employee.departmentCode == MARKETING_DEPARTMENT) {
                            const department = await (0, exports.getDepartmentByName)('Marketing ');
                            employee.employeeDepartment = department.id;
                        }
                        if (employee.departmentCode == TENDER_AND_QUOTATION_DEPARTMENT) {
                            const department = await (0, exports.getDepartmentByName)('Tender and Quoatation');
                            employee.employeeDepartment = department.id;
                        }
                        if (employee.departmentCode == MACHINE_SHOP_DEPARTMENT) {
                            const department = await (0, exports.getDepartmentByName)('Machine Shop');
                            employee.employeeDepartment = department.id;
                        }
                        if (employee.departmentCode == ALL_MANUFACTURING_SUPPORTER) {
                            const department = await (0, exports.getDepartmentByName)('All Manufacturing Supporter');
                            employee.employeeDepartment = department.id;
                        }
                        if (employee.empStatus == ACTIVE_STATUS) {
                            const employeeStatusParameter = await (0, exports.getSubParameterIdByNameByOrganization)(organizationId, 'Employee Status', 'Active');
                            employee.employeeStatus = employeeStatusParameter;
                        }
                        if (employee.empStatus == SUSPENDED_STATUS) {
                            const employeeStatusParameter = await (0, exports.getSubParameterIdByNameByOrganization)(organizationId, 'Employee Status', 'Suspended');
                            employee.employeeStatus = employeeStatusParameter;
                        }
                        if (employee.empStatus == TERMINATED_STATUS) {
                            const employeeStatusParameter = await (0, exports.getSubParameterIdByNameByOrganization)(organizationId, 'Employee Status', 'Terminated');
                            employee.employeeStatus = employeeStatusParameter;
                        }
                        if (employee.empType == PERMANENT_TYPE) {
                            const employeeTypeParameter = await (0, exports.getSubParameterIdByNameByOrganization)(organizationId, 'Employee Type', 'Permanent');
                            employee.employeeType = employeeTypeParameter;
                        }
                        if (employee.empType == CONTRACT_TYPE) {
                            const employeeTypeParameter = await (0, exports.getSubParameterIdByNameByOrganization)(organizationId, 'Employee Type', 'Contract');
                            employee.employeeType = employeeTypeParameter;
                        }
                        if (employee.empGender == MALE_SEX) {
                            const employeeGenderParameter = await (0, exports.getSubParameterIdByNameByOrganization)(organizationId, 'Sex', 'Male');
                            const employeeTitleParameter = await (0, exports.getSubParameterIdByNameByOrganization)(organizationId, 'Employee Title', 'Mr.');
                            employee.sex = employeeGenderParameter;
                            employee.employeeTitle = employeeTitleParameter;
                        }
                        if (employee.empGender == FEMALE_SEX) {
                            const employeeGenderParameter = await (0, exports.getSubParameterIdByNameByOrganization)(organizationId, 'Sex', 'Female');
                            const employeeTitleParameter = await (0, exports.getSubParameterIdByNameByOrganization)(organizationId, 'Employee Title', 'Ms.');
                            employee.sex = employeeGenderParameter;
                            employee.employeeTitle = employeeTitleParameter;
                        }
                        if (employee.empPosition == MANAGEMENT_POSITION) {
                            const employeePositionParameter = await (0, exports.getSubParameterIdByNameByOrganization)(organizationId, 'Employee Position', 'Manager');
                            employee.employeePosition = employeePositionParameter;
                        }
                        if (employee.empPosition == EMPLOYEE_POSITION) {
                            const employeePositionParameter = await (0, exports.getSubParameterIdByNameByOrganization)(organizationId, 'Employee Position', 'Employee');
                            employee.employeePosition = employeePositionParameter;
                        }
                        employee.organizationId = organizationId;
                        const newEmployee = await (0, exports.create)(employee);
                        employee.id = newEmployee.id;
                        await (0, exports.createPayTransaction)(employee);
                    }
                    catch (err) {
                        console.log(employee);
                        console.log(err);
                    }
                }
                console.log('Processing complete');
                resolve();
            });
        });
        return resultArray;
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = processCSV;
//# sourceMappingURL=employee.js.map