import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        employeeId,
        organizationId,
        transactionId,
        totalLoan,
        transactionAmount
    } = newMenu
    const query = `
	INSERT INTO 
        loan_transaction 
        (
            id,
            employee_id,
            organization_id,
            transaction_id,
            total_loan,
            transaction_amount,
            remaining_balance
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        employeeId,
        organizationId,
        transactionId,
        totalLoan,
        transactionAmount,
        totalLoan
    ])
    return res.rows[0]
}


export const getAllFromOrganization = async (organizationId: string, employeeId: any, userInfo: any): Promise<any> => {
    const { periodId } = userInfo

    let query = `
    SELECT 
    DISTINCT
    lt.id,
    lt.employee_id,
    lt.transaction_id,
    lt.total_loan,
    lt.transaction_amount,
    e1.employee_code,
    e1.first_name as employee_first_name,
    e1.last_name as employee_last_name,
    td.transaction_name,
    td.transaction_code,
    lt.remaining_balance,
    pd.parameter_name as transaction_group_name
    FROM loan_transaction lt
    INNER JOIN employee e1 ON lt.employee_id = e1.id
    INNER JOIN transaction_definition td ON lt.transaction_id = td.id
    INNER JOIN period_transactions pt ON pt.transaction_id = lt.transaction_id
    INNER JOIN parameter_definition pd ON pd.id = td.transaction_group
    WHERE pd.parameter_name = 'Loan' AND e1.organization_id=$1 AND pt.period_id = $2`;

    const queryParams = [organizationId, periodId];

    if (employeeId) {
        query += ` AND e1.id = $3`;
        queryParams.push(employeeId);
    }

    const { rows: loanTransactions } = await pool.query(query, queryParams);
    return loanTransactions;
}



export const deleteLoanTransaction = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM loan_transaction WHERE id=$1', [branchId])
}


export const updateLoanTransaction = async (updatedLoanTransaction: any): Promise<any> => {
    const {
        id,
        totalLoan,
        transactionAmount
    } = updatedLoanTransaction
    const query = `
    UPDATE loan_transaction
    SET 
    total_loan = $1,
    transaction_amount = $2 
    WHERE id = $3
    RETURNING *;
    `
    const res = await pool.query(query, [
        totalLoan,
        transactionAmount,
        id])
    const branchId = res.rows[0]
    return branchId
}

export const getById = async (loanTransactionId: string): Promise<any> => {
    const { rows: payTransactions } = await pool.query(`
    SELECT 
    *
    FROM loan_transaction
    WHERE
    id = $1
    `,
    [loanTransactionId])
    return payTransactions[0]
}



export const deleteByEmployeeId = async (employeeId: string): Promise<any> => {
    await pool.query('DELETE FROM loan_transaction WHERE employee_id=$1', [employeeId])
}



export default {
    create,
    deleteLoanTransaction,
    deleteByEmployeeId,
    getAllFromOrganization,
    getById,
    updateLoanTransaction
}