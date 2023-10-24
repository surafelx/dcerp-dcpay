const fs = require('fs');
import pool from '../config/pool'
import { v4 as uuid } from 'uuid'
import csv from 'csv-parser';
import moment from 'moment'

const MANAGEMENT_GROUP_BRANCH = '1'
const COMMERCE_AND_FINANCE_BRANCH = '2'
const PRODUCTION_OPERATION_BRANCH = '3'
const CONTRACT_EMPLOYEE_BRANCH = '4'
const ALL_BRANCH = '99'

const MANAGEMENT_DEPARTMENT = '101'
const FINANCE_DEPARTMENT = '201'
const FABRICATION_DEPARTMENT = '301'
const CONTRACT_DEPARTMENT = '401'
const MARKETING_DEPARTMENT = '202'
const TENDER_AND_QUOTATION_DEPARTMENT = '102'
const MACHINE_SHOP_DEPARTMENT = '302'
const ALL_MANUFACTURING_SUPPORTER = '303'

const MANAGEMENT_POSITION = '4001'
const EMPLOYEE_POSITION = '4002'

const MALE_SEX = '1002'
const FEMALE_SEX = '1001'

const PERMANENT_TYPE = '2001'
const CONTRACT_TYPE = '2002'

const ACTIVE_STATUS = '14001'
const SUSPENDED_STATUS = '14002'
const TERMINATED_STATUS = '14003'

const BANK_CBE = '15001'
const BANK_NA = '0'



export const getByNameAndOrganization = async (organizationId: string, transactionName: string) => {
    const { rows: employees } = await pool.query(`
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
    transaction_definition.transaction_name = $2`,
        [organizationId, transactionName])
    return employees[0]
}

export const createPT = async (newMenu: any, periodId: any): Promise<any> => {
    const id = uuid()
    const {
        employeeId,
        transactionId,
        transactionAmount
    } = newMenu
    const query = `
	INSERT INTO 
        pay_transaction 
        (
            id,
            employee_id,
            transaction_id,
            period_id,
            transaction_amount 
            ) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        employeeId,
        transactionId,
        periodId,
        transactionAmount
    ])
    return res.rows[0]
}



export const createPayTransaction = async (employee:any, periodId: any) => {
    const basicSalaryId = await getByNameAndOrganization(employee.organizationId, 'Basic Salary')
    const calculatedSalary = employee.workingDays == 0 ? employee.basicSalary : (employee.basicSalary*employee.workingDays)/30
    await createPT({employeeId: employee.id, transactionId: basicSalaryId?.id, transactionAmount: calculatedSalary}, periodId)
}

export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        employeeCode,
        employeeTitle,
        contractStartDate,
        contractEndDate,
        employmentDate,
        firstName,
        middleName,
        lastName,
        sex,
        employeeStatus,
        employeeType,
        monthlyWorkingHours,
        pensionStatus,
        pensionNumber,
        tinNumber,
        workingDays,
        employeeBank,
        employeeBankAccount,
        employeeBranch,
        employeeDepartment,
        employeePosition

    } = newMenu
    const refactoredEmpDate = !employmentDate ? null : new Date(employmentDate)
    const refactoredContEnd = !contractEndDate ? null : new Date(contractEndDate)
    const refactoredContStart = !contractStartDate ? null : new Date(contractStartDate)
    const employeePensionStatus = pensionStatus == 'TRUE' ? true : false
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
            employee_bank,
            employee_account_number,
            tin_number,
            working_days,
            employee_position
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
    RETURNING *;
    `
    const res = await pool.query(query, [
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
        employeeBank,
        employeeBankAccount,
        tinNumber,
        workingDays,
        employeePosition
    ])
    const branch = res.rows[0]
    return branch
}


export const getBranchByOrganizationByName = async (organizationId: any, branchName: any): Promise<any> => {

    const query = `
	SELECT
        *
    FROM 
    branch WHERE
    organization_id = $1 AND
    branch_name= $2
    `
    const res = await pool.query(query, [
    organizationId,
      branchName
    ])
    const branch = res.rows[0]
    return branch
}

export const getDepartmentByOrganizationByName = async (organizationId: any, branchName: any): Promise<any> => {

    const query = `
	SELECT
        *
    FROM 
    department WHERE
    organization_id = $1 AND
    department_name= $2
    `
    const res = await pool.query(query, [
        organizationId, 
      branchName
    ])
    const branch = res.rows[0]
    return branch
}


export const getSubParameterIdByNameByOrganization = async (organizationId: string, parentParameterName: string, parameterName: string): Promise<any> => {
    const { rows: parameterQueryResponse } = await pool.query(`
    SELECT pd.id
    FROM parameter_definition pd
    INNER JOIN parameter_definition parent_pd ON pd.parent_parameter_id = parent_pd.id
    WHERE parent_pd.parameter_name = $1
    AND pd.parameter_name = $2
    AND pd.organization_id = $3;

    `, [parentParameterName, parameterName, organizationId])

    return parameterQueryResponse[0].id
}



const processCSV = async (organizationId: any,csvFile: any, userInfo: any) => {
    try {
        const resultArray: any = [];
        const {periodId} = userInfo

        // Define your conditions for each column here
        const processRow = (row: any) => {

            const employeeCode = row['Empcode'];
            const empGender = row['EmpGender'];
            const empType = row['EmpType'];
            const empStatus = row['EmpStatus'];
            const empContStart = row['EmpContstartDate']
            const empContEnd = row['EmpContEndDate']
            const empDate = row['EmpDate']
            const workingDays = row['EmpMonthlyWrdays']
            const monthlyWorkingHours = row['EmpMonthlyWrHours']
            const tinNumber = row['EmpTINNO']
            const branchCode = row['EmpBranch']
            const departmentCode = row['Empdepartment']
            const empPosition = row['EmpPosition']
            const basicSalary = row['EmpBasicSalary']
            const firstName = row['Empname']
            const middleName = ''
            const lastName = ''
            const pensionNumber = row['Emppensionno']
            const pensionStatus = row['EmpPension']
            const accountNo = row['EmpAccountNo']
            const bankName = row['EmpBankname']


            const employee = {
                employeeCode,
                empGender,
                empType,
                empStatus,
                contractStartDate: !empContStart ? null : moment(empContStart, 'MM/DD/YYYY'),
                contractEndDate: !empContEnd ? null : moment(empContEnd,'MM/DD/YYYY'),
                employmentDate: !empDate ? null : moment(empDate, 'MM/DD/YYYY'),
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
                pensionNumber,
                accountNo,
                bankName
            };
            resultArray.push(employee);
        };


        const fileStream = await fs.createReadStream(csvFile);

        await new Promise((resolve: any, reject: any) => {
        fileStream
            .pipe(csv())
            .on('data', (row: any) => {
                processRow(row);
            })
            .on('end',async  () => {
                
                for (const employee of resultArray) {

                    try {

                    
                    

                        if (employee.branchCode ==  MANAGEMENT_GROUP_BRANCH) {
                            const branch = await getBranchByOrganizationByName(organizationId, 'Management Group')
                            employee.employeeBranch = branch.id
                        }
                        if (employee.branchCode ==  COMMERCE_AND_FINANCE_BRANCH) {
                            const branch = await getBranchByOrganizationByName(organizationId, 'Commerce and Finance')
                            employee.employeeBranch = branch.id
                        }
                        if (employee.branchCode ==  PRODUCTION_OPERATION_BRANCH) {
                            const branch = await getBranchByOrganizationByName(organizationId, 'Production Operation')
                            employee.employeeBranch = branch.id
                        }
                        if (employee.branchCode ==  CONTRACT_EMPLOYEE_BRANCH) {
                            const branch = await getBranchByOrganizationByName(organizationId, 'Contract Employee')
                            employee.employeeBranch = branch.id
                        }
                        if (employee.branchCode ==  ALL_BRANCH) {
                            const branch = await getBranchByOrganizationByName(organizationId, 'All')
                            employee.employeeBranch = branch.id
                        }
    
                        if (employee.departmentCode ==  MANAGEMENT_DEPARTMENT) {
                            const department = await getDepartmentByOrganizationByName(organizationId, 'Management')
                            employee.employeeDepartment = department.id
                        }
                        if (employee.departmentCode ==  FINANCE_DEPARTMENT) {
                            const department = await getDepartmentByOrganizationByName(organizationId, 'Finance ')
                            employee.employeeDepartment = department.id
                        }
                        if (employee.departmentCode ==  FABRICATION_DEPARTMENT) {
                            const department = await getDepartmentByOrganizationByName(organizationId, 'Fabrication')
                            employee.employeeDepartment = department.id
                        }
                        if (employee.departmentCode ==  CONTRACT_DEPARTMENT) {
                            const department = await getDepartmentByOrganizationByName(organizationId, 'Contract ')
                            employee.employeeDepartment = department.id
                        }
                        if (employee.departmentCode ==  MARKETING_DEPARTMENT) {
                            const department = await getDepartmentByOrganizationByName(organizationId, 'Marketing ')
                            employee.employeeDepartment = department.id
                        }
                        if (employee.departmentCode == TENDER_AND_QUOTATION_DEPARTMENT) {
                            const department = await getDepartmentByOrganizationByName(organizationId, 'Tender and Quoatation')
                            employee.employeeDepartment = department.id
                        }
                        if (employee.departmentCode ==  MACHINE_SHOP_DEPARTMENT) {
                            const department = await getDepartmentByOrganizationByName(organizationId, 'Machine Shop')
                            employee.employeeDepartment = department.id
                        }
                        if (employee.departmentCode ==  ALL_MANUFACTURING_SUPPORTER) {
                            const department = await getDepartmentByOrganizationByName(organizationId, 'All Manufacturing Supporter')
                            employee.employeeDepartment = department.id
                        }
    
                        if (employee.empStatus ==  ACTIVE_STATUS) {
                            const employeeStatusParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Status', 'Active')
                           
                            employee.employeeStatus = employeeStatusParameter
                        }
                        if (employee.empStatus ==  SUSPENDED_STATUS) {
                            const employeeStatusParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Status', 'Suspended')
                            employee.employeeStatus = employeeStatusParameter
                        }
                        if (employee.empStatus ==  TERMINATED_STATUS) {
                            const employeeStatusParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Status', 'Terminated')
                            employee.employeeStatus = employeeStatusParameter
                        }
    
                        if (employee.empType ==  PERMANENT_TYPE) {
                            const employeeTypeParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Type', 'Permanent')
                            employee.employeeType = employeeTypeParameter
                        }
                        if (employee.empType ==  CONTRACT_TYPE) {
                            const employeeTypeParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Type', 'Contract')
                            employee.employeeType = employeeTypeParameter
                        }
    
    
                        if (employee.empGender ==  MALE_SEX) {
                            const employeeGenderParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Sex', 'Male')
                            const employeeTitleParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Title', 'Mr.')
                            employee.sex = employeeGenderParameter
                            employee.employeeTitle = employeeTitleParameter
                        }
                        if (employee.empGender ==  FEMALE_SEX) {
                            const employeeGenderParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Sex', 'Female')
                            const employeeTitleParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Title', 'Ms.')
                            employee.sex = employeeGenderParameter
                            employee.employeeTitle = employeeTitleParameter
    
                        }
    
                        if (employee.empPosition ==  MANAGEMENT_POSITION) {
                            const employeePositionParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Position', 'Manager')
                            employee.employeePosition = employeePositionParameter
                        }
                        if (employee.empPosition ==  EMPLOYEE_POSITION) {
                            const employeePositionParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Position', 'Employee')
                            employee.employeePosition = employeePositionParameter
                        }
    
                       if(employee.bankName == BANK_CBE) {
                            const employeeBankParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Bank', 'CBE')
                            employee.employeeBank = employeeBankParameter
                       }

                       if(employee.bankName == BANK_NA) {
                        const employeeBankParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Bank', 'NA')
                        employee.employeeBank = employeeBankParameter
                   }

                        employee.employeeBankAccount = employee.accountNo
                        employee.organizationId = organizationId
                        const newEmployee = await create(employee)
                        employee.id = newEmployee.id
                         await createPayTransaction(employee, periodId)
                    }
                    catch(err) {
                        console.log(employee)

                        console.log(err)
                    } 
                }
                console.log('Processing complete');
                resolve(); // Resolve the promise when processing is complete.
            });
        });
        return resultArray

    } catch (err) {
        console.log(err)
    }

};

export default processCSV;