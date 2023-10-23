import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newPeriodTransaction: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        periodId,
        employeeId,
        transactionId,
        transactionAmount,
        userId
    } = newPeriodTransaction
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


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: employees } = await pool.query(`
    SELECT 
    *
    FROM period_transactions pts
    WHERE pts.organization_id=$1`,
        [organizationId])
    return employees
}


export const deletePeriodTransaction = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM period_transactions WHERE id=$1', [branchId])
}

export const deletePeriodTransactionByPayTransaction = async (deletedPayTransaction: any): Promise<any> => {
    const {
        organizationId,
        periodId,
        employeeId,
        transactionId,
        transactionAmount
    } = deletedPayTransaction
    await pool.query(`
    DELETE 
    FROM 
    period_transactions 
    WHERE 
    organization_id=$1 AND
    period_id=$2 AND
    employee_id=$3 AND
    transaction_id=$4 AND
    transaction_amount=$5`, 
    [ organizationId,
        periodId,
        employeeId,
        transactionId,
        transactionAmount])
}

export const updatePeriodTransaction = async (updatedPeriodTransaction: any): Promise<string> => {
    const {
        organizationId, 
        employeeId,
        transactionId,
        transactionAmount,
        periodId
    } = updatedPeriodTransaction
    const query = `
    UPDATE period_transactions
    SET 
    transaction_amount = $1
    WHERE 
    organization_id= $2 AND
    employee_id = $3 AND
    transaction_id = $4 AND 
    period_id = $5 
    RETURNING *;
    `
    const res = await pool.query(query, [
        transactionAmount,
        organizationId,
        employeeId, 
        transactionId,
        periodId
    ])
    return res.rows[0]
}




export default {
    create,
    deletePeriodTransaction,
    deletePeriodTransactionByPayTransaction,
    getAllFromOrganization,
    updatePeriodTransaction,
}