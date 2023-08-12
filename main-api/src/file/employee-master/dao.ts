import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'


export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        employeeCode,
        contractStartDate,
        contractEndDate,
        employmentDate,
        firstName,
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
    const refactoredEmpDate = !employmentDate ? null : new Date(employmentDate.replace(/-/g, '\/'))
    const refactoredContEnd = !contractEndDate ? null : new Date(contractEndDate.replace(/-/g, '\/'))
    const refactoredContStart = !contractStartDate ? null : new Date(contractStartDate.replace(/-/g, '\/'))
    const query = `
	INSERT INTO 
        employee 
        (
            id,
            organization_id,
            branch_id,
            department_id,
            employee_code,
            first_name,
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
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        employeeBranch,
        employeeDepartment,
        employeeCode,
        firstName,
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
    e.first_name,
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
    pt.transaction_amount as basic_salary
    FROM employee e
    INNER JOIN pay_transaction pt ON pt.employee_id = e.id
    WHERE e.organization_id=$1 AND
    pt.transaction_id = $2`,
        [organizationId, basicSalaryId])
    console.log(employees)
    return employees
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
        firstName,
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
    first_name = $4,
    last_name = $5,
    sex = $6,
    employee_status = $7,
    employee_type = $8,
    employment_date = $9, 
    contract_start_date = $10,
    contract_end_date = $11,
    monthly_working_hours = $12,
    basic_salary = $13,
    pension_number = $14,
    tin_number = $15,
    working_days = $16,
    employee_position = $17
    WHERE id = $18
    RETURNING *;
    `
    const res = await pool.query(query, [
        employeeBranch,
        employeeDepartment,
        employeeCode,
        firstName,
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
    updateEmployee
}