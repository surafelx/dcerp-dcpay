import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newMenu: any, periodId: any): Promise<any> => {
    const id = uuid()
    const {
        employeeId,
        organizationId,
        transactionId,
        transactionAmount
    } = newMenu
    const query = `
	INSERT INTO 
        pay_transaction 
        (
            id,
            employee_id,
            organization_id,
            transaction_id,
            period_id,
            transaction_amount 
            ) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        employeeId,
        organizationId,
        transactionId,
        periodId,
        transactionAmount
    ])
    return res.rows[0]
}


export const getAllFromOrganizationByEmployeeByPeriod = async (organizationId: string, employeeId: string, userInfo: any): Promise<any> => {
    const { periodId } = userInfo
    const { rows: payTransactions } = await pool.query(`
    SELECT *
    FROM (
        SELECT DISTINCT
            pt.id,
            pt.employee_id,
            td.id as transaction_id,
            pt.transaction_amount,
            e1.employee_code,
            e1.first_name as employee_first_name,
            e1.last_name as employee_last_name,
            td.id as transaction_definition_id,
            td.transaction_name,
            td.transaction_code,
            pd.parameter_name as transaction_type_name
        FROM period_transactions pt
        INNER JOIN employee e1 ON pt.employee_id = e1.id
        INNER JOIN transaction_definition td ON pt.transaction_id = td.id
        INNER JOIN parameter_definition pd ON pd.id = td.transaction_type
        WHERE e1.organization_id = $1 AND
            e1.id = $2 AND 
            pt.period_id = $3
    ) AS distinct_results
    ORDER BY CAST(employee_code AS NUMERIC) ASC;
    

    `,
        [organizationId, employeeId, periodId])
    return payTransactions
}

export const getAllFromOrganizationByPeriod = async (organizationId: string, userInfo: any): Promise<any> => {
    const { periodId } = userInfo
    const { rows: payTransactions } = await pool.query(`
    SELECT *
    FROM (
        SELECT DISTINCT
            pt.id,
            pt.employee_id,
            td.id as transaction_id,
            pt.transaction_amount,
            e1.employee_code,
            e1.first_name as employee_first_name,
            e1.last_name as employee_last_name,
            td.id as transaction_definition_id,
            td.transaction_name,
            td.transaction_code,
            pd.parameter_name as transaction_type_name
        FROM period_transactions pt
        INNER JOIN employee e1 ON pt.employee_id = e1.id
        INNER JOIN transaction_definition td ON pt.transaction_id = td.id
        INNER JOIN parameter_definition pd ON pd.id = td.transaction_type
        WHERE e1.organization_id = $1 AND
            pt.period_id = $2
    ) AS distinct_results
    ORDER BY CAST(employee_code AS NUMERIC) ASC;
    

    `,
        [organizationId, periodId])
    return payTransactions
}


export const deletePayTransaction = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM pay_transaction WHERE id=$1', [branchId])
}

export const deleteByEmployeeId = async (employeeId: string): Promise<any> => {
    await pool.query('DELETE FROM pay_transaction WHERE employee_id=$1', [employeeId])
}




export const updatePayTransaction = async (updatedPayTransaction: any): Promise<any> => {
    const {
        id,
        employeeId,
        transactionId,
        transactionAmount
    } = updatedPayTransaction
    const query = `
    UPDATE pay_transaction
    SET employee_id = $1,
    transaction_id = $2,
    transaction_amount = $3 
    WHERE id = $4
    RETURNING *;
    `
    const res = await pool.query(query, [
        employeeId,
        transactionId,
        transactionAmount,
        id])
    const branchId = res.rows[0]
    return branchId
}

export const getById = async (payTransactionId: string): Promise<any> => {
    const { rows: payTransactions } = await pool.query(`
    SELECT 
    *
    FROM pay_transaction
    WHERE
    id = $1
    `,
        [payTransactionId])
    return payTransactions[0]
}




export default {
    create,
    deletePayTransaction,
    deleteByEmployeeId,
    getAllFromOrganizationByEmployeeByPeriod,
    getAllFromOrganizationByPeriod,
    getById,
    updatePayTransaction
}