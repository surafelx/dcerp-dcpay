import pool from '../../config/pool'
import taxRateService from '../../utilities/tax-rate/service'
import payrollDisplayDao from '../../reports/payroll-display/dao'

const getAllFromOrganization = async(organizationId: string, branchId: string, departmentId: string, userInfo: any): Promise<any[]> => {
 
    let fixedBranchId: string | null = branchId
    let fixedDepartmentId: string | null = departmentId

    if(branchId === 'All')
        fixedBranchId = null 
        
    if(departmentId === 'All')
        fixedDepartmentId = null 

    
    const { rows: employees } = await pool.query(`
    SELECT 
    id, 
    employee_code,
    first_name,
    last_name
    FROM employee e1
    WHERE e1.organization_id = $1 
    AND e1.branch_id = COALESCE($2, e1.branch_id)
    AND e1.department_id = COALESCE($3, e1.department_id)`,
        [organizationId, fixedBranchId, fixedDepartmentId])



    const employeeTransactions = await Promise.all(employees.map(async (employee: any) => {
           const transactions = await payrollDisplayDao.getAllFromOrganization(organizationId, employee.id, userInfo)
            const {grossSalary, totalDeductions, grossTaxableSalary } = calculateGrossTaxable(transactions)
            const taxPay = await taxRateService.calculateTaxRate(organizationId, grossTaxableSalary)

        return {
            id: employee.id,
            employeeName: `${employee.first_name} ${employee.last_name}`,
            employeeCode: `${employee.employee_code}`,
            transactions: [...transactions],
            grossTaxableSalary,
            totalEarnings: grossSalary,
            totalDeductions,
            netPay: (grossSalary - totalDeductions),
            taxPay
        }

    }))

    return employeeTransactions

}


const calculateGrossTaxable = (transactions: any) => {
    let grossSalary = 0 
    let grossTaxableSalary = 0
    let totalDeductions = 0
    let nonTaxableTransactionAmount = 0

    transactions.map((tran: any) => {
        if(tran.transaction_type_name === 'Earning Amount') {
            grossSalary += parseFloat(tran.transaction_amount)
        }
        if(tran.transaction_type_name === 'Deduction Amount') {
            totalDeductions += parseFloat(tran.transaction_amount)
        }
        if(!tran.taxable) {
            nonTaxableTransactionAmount += parseFloat(tran.transaction_amount)
        }
    })
    grossTaxableSalary = grossSalary - nonTaxableTransactionAmount
    return {grossTaxableSalary, grossSalary, totalDeductions}
}


export default {
    getAllFromOrganization,
}