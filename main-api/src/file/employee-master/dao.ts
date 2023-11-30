import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'


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
        pensionNumber,
        pensionStatus,
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
    const refactoredPension = pensionStatus ? true : false
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
            pension_number,
            pension_status,
            tin_number,
            employee_bank,
            employee_account_number,
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
        pensionNumber,
        refactoredPension,
        tinNumber,
        employeeBank,
        employeeBankAccount,
        workingDays,
        employeePosition
    ])
    const branch = res.rows[0]
    return branch
}

export const getAllFromOrganization = async (organizationId: string, basicSalaryId: string, branchId: any, departmentId: any): Promise<any> => {
    let fixedBranchId: string | null = branchId
    let fixedDepartmentId: string | null = departmentId

    if (branchId === 'All')
        fixedBranchId = null

    if (departmentId === 'All')
        fixedDepartmentId = null

    const { rows: employees } = await pool.query(`
    SELECT *
    FROM (
        SELECT DISTINCT
            e.id,
            e.organization_id,
            e.branch_id,
            e.department_id,
            e.employee_code,
            e.employee_title,
            e.first_name,
            e.middle_name,
            e.last_name,
            e.sex,
            e.employee_status,
            e.employee_type,
            e.employment_date, 
            e.contract_start_date,
            e.contract_end_date,
            e.monthly_working_hours,
            e.pension_number,
            e.pension_status,
            e.tin_number,
            e.working_days,
            e.employee_position,
            e.employee_bank,
            e.employee_account_number,
            pt.transaction_amount as basic_salary,
            pd1.parameter_name as employee_title_name,
            pd2.parameter_name as employee_bank_name,
            pd3.parameter_name as employee_type_name
        FROM employee e
        INNER JOIN period_transactions pt ON pt.employee_id = e.id
        INNER JOIN parameter_definition pd1 ON pd1.id = e.employee_title
        INNER JOIN parameter_definition pd2 ON pd2.id = e.employee_bank
        INNER JOIN parameter_definition pd3 ON pd3.id = e.employee_type
        WHERE 
        e.organization_id = $1 AND 
        pt.organization_id = $1 AND
        pt.transaction_id = $2 AND 
        e.branch_id = COALESCE($3, e.branch_id) AND 
        e.department_id = COALESCE($4, e.department_id)
    ) AS subquery
    ORDER BY CAST(subquery.employee_code AS NUMERIC) ASC`,
        [organizationId, basicSalaryId, fixedBranchId, fixedDepartmentId])
    return employees
}



export const getInfo = async (employeeId: any): Promise<any> => {
    const { rows: employees } = await pool.query(`
    SELECT 
    *
    FROM employee
    WHERE id=$1`,
        [employeeId])

    return employees[0]
}



export const deleteEmployee = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM employee WHERE id=$1', [branchId])
}


export const updateEmployee = async (updatedEmployee: any): Promise<string> => {
    const {
        id,
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
        employmentDate,
        contractStartDate,
        contractEndDate,
        monthlyWorkingHours,
        pensionNumber,
        pensionStatus,
        tinNumber,
        workingDays,
        employeePosition,
        employeeBank, 
        employeeBankAccount
    } = updatedEmployee
    const query = `
    UPDATE employee
    SET branch_id = $1,
    department_id = $2,
    employee_code = $3,
    employee_title = $4,
    first_name = $5,
    middle_name = $6,
    last_name = $7,
    sex = $8,
    employee_status = $9,
    employee_type = $10,
    employment_date = $11, 
    contract_start_date = $12,
    contract_end_date = $13,
    monthly_working_hours = $14,
    pension_number = $15,
    tin_number = $16,
    working_days = $17,
    employee_position = $18,
    pension_status = $19,
    employee_bank = $20, 
    employee_account_number = $21
    WHERE id = $22
    RETURNING *;
    `
    const res = await pool.query(query, [
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
        new Date(employmentDate),
        new Date(contractStartDate),
        new Date(contractEndDate),
        monthlyWorkingHours,
        pensionNumber,
        tinNumber,
        workingDays,
        employeePosition,
        pensionStatus,
        employeeBank, 
        employeeBankAccount,
        id])
    const branchId = res.rows[0]
    return branchId
}


export const parameterDefinitionExists = async (parameterId: any): Promise<boolean> => {
    const { rows: res } = await pool.query(
        'SELECT EXISTS(SELECT 1 FROM employee WHERE employee_title = $1 OR employee_status = $1 OR employee_type = $1 OR employee_bank = $1 OR employee_position = $1)',
        [[parameterId]])
        return res[0].exists
}

export default {
    create,
    deleteEmployee,
    getAllFromOrganization,
    parameterDefinitionExists,
    getInfo,
    updateEmployee
}