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
        tinNumber,
        workingDays,
        // employeeBank,
        // employeeBankAccount,
        employeeBranch,
        employeeDepartment,
        employeePosition

    } = newMenu
    const refactoredEmpDate = !employmentDate ? null : new Date(employmentDate)
    const refactoredContEnd = !contractEndDate ? null : new Date(contractEndDate)
    const refactoredContStart = !contractStartDate ? null : new Date(contractStartDate)
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
            tin_number,
            working_days,
            employee_position
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
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
        tinNumber,
        workingDays,
        employeePosition
    ])
    const branch = res.rows[0]
    return branch
}


export const getAllFromOrganization = async (organizationId: string, basicSalaryId: string): Promise<any> => {
    const { rows: employees } = await pool.query(`
    SELECT 
    DISTINCT
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
    e.tin_number,
    e.working_days,
    e.employee_position,
    pt.transaction_amount as basic_salary,
    pd1.parameter_name as employee_title_name
    FROM employee e
    INNER JOIN period_transactions pt ON pt.employee_id = e.id
    INNER JOIN parameter_definition pd1 ON pd1.id = e.employee_title
    WHERE e.organization_id = $1 AND 
    pt.organization_id = $1 AND
    pt.transaction_id = $2`,
        [organizationId, basicSalaryId])
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
        basicSalary,
        pensionNumber,
        tinNumber,
        workingDays,
        employeePosition,
    } = updatedEmployee
    const query = `
    UPDATE employee
    SET branch_id = $1,
    department_id = $2,
    employee_code = $3,
    employee_title = $4
    first_name = $5,
    middle_name = $6,
    last_name = $7,
    sex = $8,
    employee_status = $9,
    employee_type = $10,
    employment_date = $11, 
    contract_start_date = $12,
    contract_end_date = $11,
    monthly_working_hours = $13,
    basic_salary = $14,
    pension_number = $15,
    tin_number = $16,
    working_days = $17,
    employee_position = $18
    WHERE id = $19
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
        basicSalary,
        pensionNumber,
        tinNumber,
        workingDays,
        employeePosition,
        id])
    const branchId = res.rows[0]
    return branchId
}



export default {
    create,
    deleteEmployee,
    getAllFromOrganization,
    getInfo,
    updateEmployee
}