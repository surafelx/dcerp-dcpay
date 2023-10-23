import pool from '../../config/pool'
import taxRateService from '../../utilities/tax-rate/service'
import { v4 as uuid } from 'uuid'


export const createPayTransaction = async (newMenu: any): Promise<any> => {
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
            transaction_amount 
            ) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        employeeId,
        transactionId,
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
        period_transactions 
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

const calculateNetPay = async (organizationId: any, transactions: any) => {
    let grossSalary = 0
    let taxableTransactionsAmount = 0
    let totalDeductions = 0
    transactions.map((tran: any) => {
        if (tran.transaction_type_name === 'Earning Amount')
            grossSalary += parseFloat(tran.transaction_amount)
        if (tran.transaction_type_name === 'Deduction Amount')
            totalDeductions += parseFloat(tran.transaction_amount)
        if (tran.taxable)
            taxableTransactionsAmount += parseFloat(tran.transaction_amount)
    })


    const grossTaxableSalary = grossSalary - taxableTransactionsAmount
    const tax = await taxRateService.calculateTaxRate(organizationId, grossTaxableSalary)
    totalDeductions += tax
    const netPay = grossSalary - totalDeductions

    return { grossTaxableSalary, netPay, tax, grossSalary, totalDeductions, taxableTransactionsAmount }
}


const processPayTransactions = async (employee: any, organizationId: any, userInfo: any) => {

    const {userId, periodId } = userInfo
    let processedTransactions: any = []

    const { rows: payTransactions } = await pool.query(`
    SELECT 
    pt.transaction_id as id,
    pt.transaction_amount,
    td.transaction_name,
    pd1.parameter_name as transaction_type_name,
    pd2.parameter_name as update_type_name
    FROM pay_transaction pt
    INNER JOIN transaction_definition td ON pt.transaction_id = td.id
    INNER JOIN parameter_definition pd1 ON pd1.id = td.transaction_type
    INNER JOIN parameter_definition pd2 ON pd2.id = td.update_type
    WHERE pt.employee_id=$1`,
        [employee.id])
        

    const { rows: memberships } = await pool.query(`
        SELECT 
        ms.transaction_id as id,
        td.transaction_name,
        pd1.parameter_name as transaction_type_name,
        pd2.parameter_name as update_type_name
        FROM membership ms
        INNER JOIN transaction_definition td ON ms.transaction_id = td.id
        INNER JOIN parameter_definition pd1 ON pd1.id = td.transaction_type
        INNER JOIN parameter_definition pd2 ON pd2.id = td.update_type
        WHERE ms.employee_id=$1`,
        [employee.id])



    const { rows: transactionDefinitions } = await pool.query(`
    SELECT 
    td.id,
    transaction_name,
    transaction_code,
    pd2.parameter_name as update_type_name,
    pd1.parameter_name as transaction_type_name,
    pd3.parameter_name as transaction_group_name
    FROM transaction_definition td
    INNER JOIN parameter_definition pd1 ON pd1.id = td.transaction_type
    INNER JOIN parameter_definition pd2 ON pd2.id = td.update_type  
    INNER JOIN parameter_definition pd3 ON pd3.id = td.transaction_group
    WHERE td.organization_id=$1 ORDER BY td.transaction_code ASC
    `, [organizationId])


    const filteredTDs = transactionDefinitions.filter((td: any) => {
        return ![...payTransactions, ...memberships].some((et: any) => et.id === td.id);
    })

    filteredTDs.map(async (td: any) => {
        if (td.update_type_name == 'Input' || td.transaction_name == 'None')
                if (td.transaction_code != '51' && td.transaction_code != '52' && td.transaction_code != '99') {
                    await createPayTransaction({ employeeId: employee.id, transactionId: td.id, transactionAmount: 0 })
                    await createProcessedTransactions({ employeeId: employee.id, transactionId: td.id, transactionAmount: 0, userId, periodId, organizationId })
            }
        if(td.transaction_group_name == 'Loan') 
            await createLoanTransaction({ employeeId: employee.id, transactionId: td.id, totalLoan: 0, remainingBalance: 0, transactionAmount: 0 })
            await createProcessedTransactions({ employeeId: employee.id, transactionId: td.id, transactionAmount: 0, userId, periodId, organizationId })
        
        
    })


    return processedTransactions
}

const getAllFromOrganization = async (organizationId: string, employeeId: string, userInfo: any) => {
    const { rows: employees } = await pool.query(`
    SELECT 
    id, 
    employee_code,
    first_name,
    last_name
    FROM employee e1
    WHERE id=$1`,
        [employeeId])


    const employee = employees[0]



    await processPayTransactions(employee, organizationId, userInfo)

    const { rows: payTransactions } = await pool.query(`
        SELECT 
        pt.transaction_id as id,
        pt.transaction_amount,
        td.transaction_name,
        td.taxable,
        pd1.parameter_name as transaction_type_name,
        pd2.parameter_name as update_type_name
        FROM pay_transaction pt
        INNER JOIN transaction_definition td ON pt.transaction_id = td.id
        INNER JOIN parameter_definition pd1 ON pd1.id = td.transaction_type
        INNER JOIN parameter_definition pd2 ON pd2.id = td.update_type
        WHERE pt.employee_id=$1`,
        [employeeId])

    const { rows: loanTransactions } = await pool.query(`
        SELECT 
        lt.transaction_id as id,
        lt.transaction_amount,
        td.transaction_name,
        pd1.parameter_name as transaction_type_name,
        pd2.parameter_name as update_type_name
        FROM loan_transaction lt
        INNER JOIN transaction_definition td ON lt.transaction_id = td.id
        INNER JOIN parameter_definition pd1 ON pd1.id = td.transaction_type
        INNER JOIN parameter_definition pd2 ON pd2.id = td.update_type
        WHERE lt.employee_id=$1`,
        [employeeId])


    const { rows: memberships } = await pool.query(`
        SELECT 
        ms.transaction_id as id,
        td.transaction_name,
        td.taxable,
        pd1.parameter_name as transaction_type_name,
        pd2.parameter_name as update_type_name
        FROM membership ms
        INNER JOIN transaction_definition td ON ms.transaction_id = td.id
        INNER JOIN parameter_definition pd1 ON pd1.id = td.transaction_type
        INNER JOIN parameter_definition pd2 ON pd2.id = td.update_type
        WHERE ms.employee_id=$1`,
        [employeeId])


    const tranC: any[] = []
    const allTransactions = [...payTransactions, ...loanTransactions]


    await Promise.all([...memberships, ...payTransactions].map(async (payTransaction) => {
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
            INNER JOIN pay_transaction pt1 ON pt1.transaction_id = tc.second_transaction_id
            INNER JOIN pay_transaction pt2 ON pt2.transaction_id = tc.third_transaction_id 
            INNER JOIN employee e1 ON e1.id = pt1.employee_id
            WHERE e1.id = $1 AND pt1.employee_id = $1 AND pt2.employee_id = $1 AND (tc.third_transaction_id = $2 OR tc.first_transaction_id = $2)
            `,
            [employee.id, payTransaction.id])
        tranC.push(...tranCal)
    }))

    if (tranC.length > 0) {
        const calculatedTrans = tranC.map((calc) => calculateTransactionCalculations(calc))
        allTransactions.push(...calculatedTrans)
    }

    const { grossSalary, grossTaxableSalary, netPay, tax, totalDeductions, taxableTransactionsAmount } = await calculateNetPay(organizationId, allTransactions)

    // const grossSalaryTransaction = await pool.query('SELECT * FROM transaction_definition ')
    // await createProcessedTransactions({ employeeId: employee.id, transactionId: td.id, transactionAmount: 0, userId, periodId, organizationId })


    console.log(grossTaxableSalary, netPay, tax, grossSalary,totalDeductions, taxableTransactionsAmount)

    return [...allTransactions]

}

// Only Create Period Transactions
// For Pay Transaction
// For Loan Transaction
// Calculate Them and Put into Period Transactions
// Fetch from Period Transaction

const calculateTransactionCalculations = (transaction: any) => {
    let transaction_amount: any = 0
        if (transaction.calculation_unit_name === 'Monthly')
            transaction_amount = parseFloat(transaction.second_transaction_value)
        if (transaction.calculation_unit_name === 'Hourly')
            transaction_amount = parseFloat(transaction.second_transaction_value) / parseFloat(transaction.monthly_working_hours)
        if (transaction.calculation_unit_name === 'Daily')
            transaction_amount = parseFloat(transaction.second_transaction_value) / parseFloat(transaction.working_days)
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
        update_type_name: transaction.update_type_name

    }
}



export default {
    getAllFromOrganization,
}