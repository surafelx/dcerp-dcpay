import pool from '../../config/pool'
import taxRateService from '../../utilities/tax-rate/service'
import employeeService from '../../file/employee-master/service'



import { v4 as uuid } from 'uuid'

const checkIfMembership = async (transactionId: any, employeeId: any): Promise<any> => {
    const { rows: processedTransactions } = await pool.query(`
    SELECT
   *
  FROM membership
  WHERE transaction_id = $1 AND
  employee_id = $2
          `,
        [transactionId, employeeId]);
    return processedTransactions.length > 0;
}

export const createPayTransaction = async (newMenu: any, periodId: any): Promise<any> => {
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

export const createLoanTransaction = async (newLoanTransaction: any): Promise<any> => {
    const id = uuid()
    const {
        employeeId,
        transactionId,
        totalLoan,
        transactionAmount
    } = newLoanTransaction
    const query = `
	INSERT INTO 
        loan_transaction 
        (
            id,
            employee_id,
            transaction_id,
            total_loan,
            transaction_amount,
            remaining_balance
            ) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        employeeId,
        transactionId,
        totalLoan,
        transactionAmount,
        totalLoan
    ])
    return res.rows[0]
}


export const createProcessedTransactions = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        periodId,
        employeeId,
        transactionId,
        transactionAmount,
        userId
    } = newMenu
    const query = `
	INSERT INTO 
        processed_transactions 
        (
            id,
            organization_id,
            period_id,
            employee_id,
            transaction_id,
            transaction_amount,
            transaction_affected_amount,
            transaction_printed_flag,
            transaction_user_id, 
            transaction_record_number,
            transaction_date 
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        periodId,
        employeeId,
        transactionId,
        transactionAmount,
        0,
        false,
        userId,
        0,
        new Date()
    ])
    return res.rows[0]
}


const processPayLoanMembershipTransactions = async (organizationId: any, employeeId: any, userInfo: any) => {
    await pool.query(`
    WITH DeleteEmployeeData AS (
        DELETE FROM processed_transactions
        WHERE employee_id = $1 AND 
        period_id = $2
        RETURNING *
      )
      SELECT CASE WHEN EXISTS (SELECT 1 FROM DeleteEmployeeData) THEN 'Data Deleted' ELSE 'No Data Found' END AS result;
`,
        [employeeId, userInfo.periodId])


    const { rows: employees } = await pool.query(`
      SELECT * FROM employee WHERE id = $1
    `,
        [employeeId])

    const { userId, periodId } = userInfo
    let processedTransactions: any = []

    let grossSalary = 0
    let overPay = 0
    let netPay = 0
    let lastOverpay = 0
    let totalDeductions = 0
    let grossTaxableSalary = 0
    let totalOvertime = 0
    let tax = 0

    const { rows: transactionDefinitions } = await pool.query(`
    SELECT 
    td.id,
    td.transaction_name,
    td.transaction_code,
    td.taxable,
    pd2.parameter_name as update_type_name,
    pd1.parameter_name as transaction_type_name,
    pd3.parameter_name as transaction_group_name,
    COALESCE(pert.transaction_amount, '0') AS transaction_amount
FROM transaction_definition td
INNER JOIN parameter_definition pd1 ON pd1.id = td.transaction_type
INNER JOIN parameter_definition pd2 ON pd2.id = td.update_type  
INNER JOIN parameter_definition pd3 ON pd3.id = td.transaction_group
LEFT JOIN (
    SELECT DISTINCT ON (pt.transaction_id) pt.id, pt.transaction_id, pt.transaction_amount
    FROM period_transactions pt
    WHERE pt.employee_id = $2 AND pt.period_id = $3
) AS pert ON pert.transaction_id = td.id
WHERE td.organization_id = $1
ORDER BY CAST(td.transaction_code AS NUMERIC) ASC;
`,
        [organizationId, employeeId, userInfo.periodId])

    for (const td of transactionDefinitions) {
        if (td.update_type_name == 'Input' || td.transaction_name == 'None') {
            if (td.transaction_code !== 'Not Editable') {
                await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: td.transaction_amount, userId, periodId, organizationId })
            }
        }
        if (td.transaction_group_name == 'Loan') {
            await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: td.transaction_amount, userId, periodId, organizationId })
            totalDeductions += parseFloat(td.transaction_amount) || 0
        }
        if (td.transaction_group_name == 'Membership' && !td.transaction_amount) {
            await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: td.transaction_amount, userId, periodId, organizationId })
        }

        if (td.update_type_name === 'Calculation') {
            const transactionCalculationFormat = await getTransactionCalculationFormat(employeeId, td.id, periodId)
            if (transactionCalculationFormat.length > 0) {
                let membershipTasked: any = false
                if (td.transaction_group_name == 'Membership')
                    membershipTasked = await checkIfMembership(td.id, employeeId)
                const calculatedTransaction = calculateTransactionCalculations(transactionCalculationFormat[0], employees[0])

                const { pension_status: pensionStatus } = await employeeService.getInfo(employeeId)
                if (pensionStatus && td.transaction_code == '23') {
                    await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: calculatedTransaction.transaction_amount, userId, periodId, organizationId })
                }
                if (td.transaction_code != '23' && (membershipTasked || td.transaction_group_name != 'Membership'))
                    await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: calculatedTransaction.transaction_amount, userId, periodId, organizationId })
                if (calculatedTransaction.transaction_type_name == 'Deduction Amount' && (pensionStatus || td.transaction_code !== '22') && (membershipTasked || td.transaction_group_name != 'Membership') && (pensionStatus || td.transaction_code !== '23')) {
                    totalDeductions += parseFloat(calculatedTransaction.transaction_amount) || 0
                }
            }
        }


        if (td.update_type_name == 'Input' && td.transaction_type_name == 'Earning Amount') {
            grossSalary += parseFloat(td.transaction_amount) || 0
        }

        if (td.update_type_name == 'Input' && td.transaction_type_name == 'Deduction Amount') {
            totalDeductions += parseFloat(td.transaction_amount) || 0
        }

        if (td.transaction_code == '11' || td.transaction_code == '13' || td.transaction_code == '15' || td.transaction_code == '17') {
            totalOvertime += parseFloat(td.transaction_amount) || 0
        }


    }

    for (const td of transactionDefinitions) {
        if (td.transaction_code == '21') {
            const periodTransactionsForGrossSalary = await getProcessedTransactions(employeeId, periodId)
            let grossSalaryWithoutAbsence = periodTransactionsForGrossSalary
                .filter((pt: any) => pt.transaction_type_name == 'Earning Amount')
                .reduce((total: any, fpt: any) => total + parseFloat(fpt.transaction_amount), 0);
            const absenceAmountReductions = periodTransactionsForGrossSalary
                .filter((pt: any) => pt.transaction_group_name == 'Absence')
                .reduce((total: any, fpt: any) => total + parseFloat(fpt.transaction_amount), 0);
            grossSalary = grossSalaryWithoutAbsence - absenceAmountReductions
            const nonTaxableTransactionAmount = periodTransactionsForGrossSalary
                .filter((pt: any) => !pt.taxable)
                .reduce((total: any, fpt: any) => total + parseFloat(fpt.transaction_amount), 0);
            grossTaxableSalary = grossSalary - nonTaxableTransactionAmount
            totalDeductions -= absenceAmountReductions
            tax = await taxRateService.calculateTaxRate(organizationId, grossTaxableSalary)
            await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: tax, userId, periodId, organizationId })
            totalDeductions += tax

        }


        if (td.transaction_code == '50') {
            await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: totalOvertime, userId, periodId, organizationId })
        }

        if (td.transaction_code == '51') {
            await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: grossTaxableSalary, userId, periodId, organizationId })
        }

        if (td.transaction_code == '52') {
            await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: grossSalary, userId, periodId, organizationId })
        }


        if (td.transaction_code == '97') {
            if (totalDeductions > grossSalary)
                overPay = totalDeductions - grossSalary
            await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: lastOverpay, userId, periodId, organizationId })
        }

        if (td.transaction_code == '98') {
            if (overPay > 0)
                overPay = totalDeductions - grossSalary
            await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: overPay, userId, periodId, organizationId })
        }


        if (td.transaction_code == '99') {
            netPay = grossSalary - totalDeductions
            await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: netPay, userId, periodId, organizationId })
        }
    }


    return processedTransactions
}

const getTransactionCalculationFormat = async (employeeId: any, transactionId: any, periodId: any) => {
    const { rows: tranCal } = await pool.query(`
            SELECT 
            DISTINCT
            td1.id as id,
            td1.transaction_name as first_transaction_name,
            td2.transaction_name as second_transaction_name,
            td1.taxable,
            pd1.parameter_name as calculation_unit_name,
            pd2.parameter_name as first_option_value,
            pd3.parameter_name as second_option_value,
            pt1.transaction_amount as second_transaction_value,
            pt2.transaction_amount as third_transaction_value,
            pd4.parameter_name as transaction_type_name,
            pd5.parameter_name as update_type_name,
            pd6.parameter_name as transaction_group_name,
            e1.id as employee_id,
            e1.monthly_working_hours,
            e1.working_days,
            tc.rate
            FROM transaction_calculation tc
            INNER JOIN parameter_definition pd1 ON pd1.id = tc.calculation_unit
            INNER JOIN parameter_definition pd2 ON pd2.id = tc.first_option
            INNER JOIN parameter_definition pd3 ON pd3.id = tc.second_option
            INNER JOIN transaction_definition td1 ON td1.id = tc.first_transaction_id
            INNER JOIN parameter_definition pd4 ON pd4.id = td1.transaction_type
            INNER JOIN parameter_definition pd5 ON pd5.id = td1.update_type
            INNER JOIN parameter_definition pd6 ON pd6.id = td1.transaction_group
            INNER JOIN transaction_definition td2 ON td2.id = tc.second_transaction_id
            LEFT JOIN period_transactions pt1 ON pt1.transaction_id = tc.second_transaction_id
            LEFT JOIN period_transactions pt2 ON pt2.transaction_id = tc.third_transaction_id 
            INNER JOIN employee e1 ON e1.id = pt1.employee_id
            WHERE e1.id = $1 AND tc.first_transaction_id=$2 AND pt1.employee_id = $1 AND pt2.employee_id = $1 AND pt1.period_id = $3 AND pt2.period_id=$3
            `,
        [employeeId, transactionId, periodId])
    return tranCal
}


const getTranCal = async (transactionId: any, employeeId: any,) => {
    const { rows: tranCal } = await pool.query(`
            SELECT 
            DISTINCT
            td1.id as id,
            td1.transaction_name as first_transaction_name,
            td2.transaction_name as second_transaction_name,
            td1.taxable,
            pd1.parameter_name as calculation_unit_name,
            pd2.parameter_name as first_option_value,
            pd3.parameter_name as second_option_value,
            pt1.transaction_amount as second_transaction_value,
            pd4.parameter_name as transaction_type_name,
            pd5.parameter_name as update_type_name,
            pd6.parameter_name as transaction_group_name,
            e1.id as employee_id,
            e1.monthly_working_hours,
            e1.working_days,
            tc.rate
            FROM transaction_calculation tc
            INNER JOIN parameter_definition pd1 ON pd1.id = tc.calculation_unit
            INNER JOIN parameter_definition pd2 ON pd2.id = tc.first_option
            INNER JOIN parameter_definition pd3 ON pd3.id = tc.second_option
            INNER JOIN transaction_definition td1 ON td1.id = tc.first_transaction_id
            INNER JOIN parameter_definition pd4 ON pd4.id = td1.transaction_type
            INNER JOIN parameter_definition pd5 ON pd5.id = td1.update_type
            INNER JOIN parameter_definition pd6 ON pd6.id = td1.transaction_group
            INNER JOIN transaction_definition td2 ON td2.id = tc.second_transaction_id
            LEFT JOIN period_transactions pt1 ON pt1.transaction_id = tc.second_transaction_id
            INNER JOIN employee e1 ON e1.id = pt1.employee_id
            WHERE tc.first_transaction_id=$1 AND pt1.employee_id = $2
            `,
        [transactionId, employeeId])
    return tranCal
}


const getPeriodTransactions = async (employeeId: any, periodId: any) => {
    const { rows: periodTransactions } = await pool.query(`
    SELECT 
    pt.id,
    td.id as transaction_id,
    td.transaction_code,
    td.transaction_name,
    td.taxable,
    pt.transaction_amount,
    pd1.parameter_name as update_type_name,
    pd2.parameter_name as transaction_group_name,
    pd3.parameter_name as transaction_type_name
    FROM period_transactions pt
    INNER JOIN transaction_definition td ON td.id = pt.transaction_id
    INNER JOIN parameter_definition pd1 ON pd1.id = td.update_type
    INNER JOIN parameter_definition pd2 ON pd2.id = td.transaction_group
    INNER JOIN parameter_definition pd3 ON pd3.id = td.transaction_type
    WHERE pt.employee_id=$1 AND pt.period_id=$2
    ORDER BY CAST(td.transaction_code AS NUMERIC) ASC;`,
        [employeeId, periodId])
    return periodTransactions
}

const getProcessedTransactions = async (employeeId: any, periodId: any) => {
    const { rows: periodTransactions } = await pool.query(`
    SELECT 
    pt.id,
    td.id as transaction_id,
    td.transaction_code,
    td.transaction_name,
    td.taxable,
    pt.transaction_amount,
    pd1.parameter_name as update_type_name,
    pd2.parameter_name as transaction_group_name,
    pd3.parameter_name as transaction_type_name
    FROM processed_transactions pt
    INNER JOIN transaction_definition td ON td.id = pt.transaction_id
    INNER JOIN parameter_definition pd1 ON pd1.id = td.update_type
    INNER JOIN parameter_definition pd2 ON pd2.id = td.transaction_group
    INNER JOIN parameter_definition pd3 ON pd3.id = td.transaction_type
    WHERE pt.employee_id=$1 AND pt.period_id=$2
    ORDER BY CAST(td.transaction_code AS NUMERIC) ASC;`,
        [employeeId, periodId])
    return periodTransactions
}

const getAllFromOrganization = async (organizationId: string, branchId: string, departmentId: string, userInfo: any): Promise<any[]> => {
    let fixedBranchId: string | null = branchId
    let fixedDepartmentId: string | null = departmentId

    if (branchId === 'All' || !branchId)
        fixedBranchId = null

    if (departmentId === 'All' || !departmentId)
        fixedDepartmentId = null



    const employees = await getEmployeeByBranchByDepartment(organizationId, fixedBranchId, fixedDepartmentId)
    await Promise.all(employees.map(async (employee: any) => {
        await processPayLoanMembershipTransactions(organizationId, employee.id, userInfo)
    }))

    const { rows: processedTransactions } = await pool.query(`
        WITH EmployeeTransactionData AS (
            SELECT
              employee.id AS employee_id,
              employee.first_name,
              employee.last_name,
              employee.employee_code,
              employee.employee_account_number,
              pt.id AS processed_transaction_id,
              td.id AS transaction_id,
              td.transaction_code,
              td.transaction_name,
              td.taxable,
              pt.transaction_amount,
              pd1.parameter_name AS update_type_name,
              pd2.parameter_name AS transaction_group_name,
              pd3.parameter_name AS transaction_type_name
            FROM processed_transactions pt
            INNER JOIN transaction_definition td ON td.id = pt.transaction_id
            INNER JOIN parameter_definition pd1 ON pd1.id = td.update_type
            INNER JOIN parameter_definition pd2 ON pd2.id = td.transaction_group
            INNER JOIN parameter_definition pd3 ON pd3.id = td.transaction_type
            INNER JOIN employee ON pt.employee_id = employee.id
            WHERE pt.period_id = $1
          )
          SELECT
            employee_id AS id,
            employee_code,
            employee_account_number,
            first_name,
            ARRAY_AGG(
              JSONB_BUILD_OBJECT(
                'processed_transaction_id', processed_transaction_id,
                'transaction_id', transaction_id,
                'transaction_code', transaction_code,
                'transaction_name', transaction_name,
                'taxable', taxable,
                'transaction_amount', transaction_amount,
                'update_type_name', update_type_name,
                'transaction_group_name', transaction_group_name,
                'transaction_type_name', transaction_type_name
              )
            ) AS transactions
          FROM EmployeeTransactionData
          GROUP BY employee_id, employee_code, first_name, employee_account_number
          ORDER BY CAST(employee_code AS NUMERIC) ASC;
          `,
        [userInfo.periodId])

    return processedTransactions
}

const getEmployeeByBranchByDepartment = async (organizationId: any, branchId: any, departmentId: any): Promise<any[]> => {
    const { rows: employees } = await pool.query(`
    SELECT 
    e1.id, 
    employee_code,
    first_name,
    last_name,
    pd1.parameter_name as employee_status_name
    FROM employee e1
    INNER JOIN parameter_definition pd1 ON pd1.id = e1.employee_status
    WHERE e1.organization_id = $1 
    AND e1.branch_id = COALESCE($2, e1.branch_id)
    AND e1.department_id = COALESCE($3, e1.department_id)
    AND pd1.parameter_name = 'Active'
    `,
        [organizationId, branchId, departmentId])
    return employees
}

const calculateTransactionCalculations = (transaction: any, employee: any) => {
    const { monthly_working_hours } = employee
    let transaction_amount: any = 0
    if (transaction.calculation_unit_name === 'Monthly')
        transaction_amount = parseFloat(transaction.second_transaction_value)
    if (transaction.calculation_unit_name === 'Hourly')
        transaction_amount = parseFloat(transaction.second_transaction_value) / Number(monthly_working_hours)
    if (transaction.calculation_unit_name === 'Daily')
        transaction_amount = parseFloat(transaction.second_transaction_value) / 30
    if (transaction.first_option_value === '*')
        transaction_amount *= parseFloat(transaction.third_transaction_value)
    if (transaction.second_option_value === '*')
        transaction_amount *= parseFloat(transaction.rate)
    if (transaction.first_option_value === '=' && transaction.second_option_value === '=')
        transaction_amount = parseFloat(transaction.rate)
    return {
        id: transaction.id,
        transaction_name: transaction.first_transaction_name,
        transaction_amount,
        transaction_type_name: transaction.transaction_type_name,
        transaction_group_name: transaction.transaction_group_name,
        update_type_name: transaction.update_type_name

    }
}


const getProcessedTransactionsByEmployee = async (periodId: any, employeeId: any): Promise<any[]> => {
    const { rows: processedTransactions } = await pool.query(`
    SELECT
    pt.id,
    td.id AS transaction_id,
    td.transaction_code,
    td.transaction_name,
    td.taxable,
    pt.transaction_amount,
    pd1.parameter_name AS update_type_name,
    pd2.parameter_name AS transaction_group_name,
    pd3.parameter_name AS transaction_type_name
  FROM processed_transactions pt
  INNER JOIN transaction_definition td ON td.id = pt.transaction_id
  INNER JOIN parameter_definition pd1 ON pd1.id = td.update_type
  INNER JOIN parameter_definition pd2 ON pd2.id = td.transaction_group
  INNER JOIN parameter_definition pd3 ON pd3.id = td.transaction_type
  WHERE pt.period_id = $1
  AND pt.employee_id = $2
          `,
        [periodId, employeeId]);
    return processedTransactions
}

const getAllByEmployee = async (employeeId: any): Promise<any[]> => {
    const { rows: processedTransactions } = await pool.query(`
    SELECT
   *
  FROM processed_transactions pt
  WHERE pt.employee_id = $1
          `,
        [employeeId]);

    return processedTransactions
}

export const checkTransactionIdExists = async (transactionId: any): Promise<boolean> => {
    const { rows: res } = await pool.query(
        'select exists(select 1 from processed_transactions where transaction_id = $1)',
        [transactionId])
    return res[0].exists
}



export default {
    getAllFromOrganization,
    processPayLoanMembershipTransactions,
    getTransactionCalculationFormat,
    getAllByEmployee,
    checkTransactionIdExists,
    getProcessedTransactionsByEmployee,
    getTranCal,
    calculateTransactionCalculations,
    getPeriodTransactions
}