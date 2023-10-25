import pool from '../../config/pool'
import taxRateService from '../../utilities/tax-rate/service'
import employeeService from '../../file/employee-master/service'

import { v4 as uuid } from 'uuid'


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


const processPayLoanMembershipTransactions = async (organizationId: any, employeeId: any, periodTransactions: any, userInfo: any) => {

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
    transaction_name,
    transaction_code,
    td.taxable,
    pd2.parameter_name as update_type_name,
    pd1.parameter_name as transaction_type_name,
    pd3.parameter_name as transaction_group_name
    FROM transaction_definition td
    INNER JOIN parameter_definition pd1 ON pd1.id = td.transaction_type
    INNER JOIN parameter_definition pd2 ON pd2.id = td.update_type  
    INNER JOIN parameter_definition pd3 ON pd3.id = td.transaction_group
    WHERE td.organization_id=$1
    ORDER BY CAST(td.transaction_code AS NUMERIC) ASC;`,
        [organizationId])


    // const filteredTDs = transactionDefinitions.filter((td: any) => {
    //     return ![...periodTransactions].some((et: any) => et.transaction_id === td.id);
    // })

    for (const td of transactionDefinitions) {
        const periodTransactionExists = periodTransactions.some((periodTran: any) => periodTran.transaction_id == td.id);
        if (td.update_type_name == 'Input' || td.transaction_name == 'None') {
            if (td.transaction_code !== 'Not Editable') {
                if (!periodTransactionExists) {
                    await createPayTransaction({ employeeId, transactionId: td.id, transactionAmount: 0 }, periodId)
                    await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: 0, userId, periodId, organizationId })
                }
            }
        }
        if (td.transaction_group_name == 'Loan') {
            if (!periodTransactionExists) {
                await createLoanTransaction({ employeeId, transactionId: td.id, totalLoan: 0, remainingBalance: 0, transactionAmount: 0 })
                await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: 0, userId, periodId, organizationId })
            }
        }
        if (td.update_type_name === 'Calculation' && td.transaction_group_name != 'Membership') {
            const transactionCalculationFormat = await getTransactionCalculationFormat(employeeId, td.id, periodId)
            if (transactionCalculationFormat.length > 0) {
                const calculatedTransaction = calculateTransactionCalculations(transactionCalculationFormat[0])
                if (!periodTransactionExists) {
                    const { pension_status: pensionStatus } = await employeeService.getInfo(employeeId)
                    if(pensionStatus && td.transaction_code == '23')
                        await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: calculatedTransaction.transaction_amount, userId, periodId, organizationId })
                    if(td.transaction_code != '23')
                        await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: calculatedTransaction.transaction_amount, userId, periodId, organizationId })

                }
                if (calculatedTransaction.transaction_type_name == 'Deduction Amount') {
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




        if (td.transaction_code == '21') {
            const periodTransactionsForGrossSalary = await getPeriodTransactions(employeeId, periodId)
            grossSalary = periodTransactionsForGrossSalary
                .filter((pt: any) => pt.transaction_type_name == 'Earning Amount')
                .reduce((total: any, fpt: any) => total + parseFloat(fpt.transaction_amount), 0);

            const nonTaxableTransactionAmount = periodTransactions
                .filter((pt: any) => !pt.taxable)
                .reduce((total: any, fpt: any) => total + parseFloat(fpt.transaction_amount), 0);
            grossTaxableSalary = grossSalary - nonTaxableTransactionAmount
            tax = await taxRateService.calculateTaxRate(organizationId, grossTaxableSalary)
            if (!periodTransactionExists) {
                await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: tax, userId, periodId, organizationId })

            }
            totalDeductions += tax
        }

        if (td.transaction_code == '50') {
            if (!periodTransactionExists)
                await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: totalOvertime, userId, periodId, organizationId })
        }

        if (td.transaction_code == '51') {
            if (!periodTransactionExists)
                await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: grossTaxableSalary, userId, periodId, organizationId })
        }

        if (td.transaction_code == '52') {
            if (!periodTransactionExists)
                await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: grossSalary, userId, periodId, organizationId })
        }


        if (td.transaction_code == '97') {
            if (totalDeductions > grossSalary)
                overPay = totalDeductions - grossSalary
            if (!periodTransactionExists)
                await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: lastOverpay, userId, periodId, organizationId })
        }

        if (td.transaction_code == '98') {
            if (overPay > 0)
                overPay = totalDeductions - grossSalary
            if (!periodTransactionExists)
                await createProcessedTransactions({ employeeId, transactionId: td.id, transactionAmount: overPay, userId, periodId, organizationId })
        }


        if (td.transaction_code == '99') {
            netPay = grossSalary - totalDeductions
            if (!periodTransactionExists)
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
// const processTransactions = async (organizationId: any, employeeId: any, periodTransactions: any, userInfo: any) => {
//     const {userId, periodId} = userInfo 



//         for (const td of periodTransactions) {

//     }

// }

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

const getAllFromOrganization = async (organizationId: string, employeeId: string, userInfo: any) => {
    if (!employeeId)
        return []

    const periodTransactions = await getPeriodTransactions(employeeId, userInfo.periodId)
    await processPayLoanMembershipTransactions(organizationId, employeeId, periodTransactions, userInfo)
    const processedPeriodTransactions = await getPeriodTransactions(employeeId, userInfo.periodId)
    return processedPeriodTransactions
}


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
    processPayLoanMembershipTransactions,
    getPeriodTransactions
}