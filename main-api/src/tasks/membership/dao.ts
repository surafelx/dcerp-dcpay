import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        employeeId,
        transactionId
    } = newMenu
    const query = `
	INSERT INTO 
        membership 
        (
            id,
            organization_id,
            employee_id,
            transaction_id
            ) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        employeeId,
        transactionId
    ])
    return res.rows[0]
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: memberships } = await pool.query(`
    SELECT 
    ms.id,
    ms.employee_id,
    ms.transaction_id,
    e1.employee_code,
    e1.first_name as employee_first_name,
    e1.last_name as employee_last_name,
    td.transaction_name,
    td.transaction_code
    FROM membership ms
    INNER JOIN employee e1 ON ms.employee_id = e1.id
    INNER JOIN transaction_definition td ON ms.transaction_id = td.id
    WHERE e1.organization_id=$1`,
        [organizationId])

    return memberships
}


export const getAllFromOrganizationByEmployeeByPeriod = async (organizationId: string, employeeId: string, userInfo: any): Promise<any> => {
    const { periodId } = userInfo

    let query = `
        SELECT 
        DISTINCT
        ms.id,
        ms.employee_id,
        ms.transaction_id,
        e1.employee_code,
        e1.first_name as employee_first_name,
        e1.last_name as employee_last_name,
        td.transaction_name,
        td.transaction_code
        FROM membership ms
        INNER JOIN employee e1 ON ms.employee_id = e1.id
        INNER JOIN transaction_definition td ON ms.transaction_id = td.id
        INNER JOIN period_transactions pt ON pt.transaction_id = ms.transaction_id
        WHERE e1.organization_id = $1 AND pt.period_id = $2
    `

    const queryParams = [organizationId, periodId]

    if (employeeId) {
        query += ` AND e1.id = $3`;
        queryParams.push(employeeId);
    }

    const { rows: memberships } = await pool.query(query, queryParams);
    return memberships

}


export const getInfo = async (membershipId: string): Promise<any> => {
    const { rows: memberships } = await pool.query(`
    SELECT 
    ms.id,
    ms.employee_id,
    ms.transaction_id,
    pt.transaction_amount
    FROM membership ms
    INNER JOIN period_transactions pt ON pt.transaction_id = ms.transaction_id
    WHERE ms.id = $1 AND pt.employee_id = ms.employee_id`,
        [membershipId])
    return memberships[0]
}


export const deleteMembership = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM membership WHERE id=$1', [branchId])
}


export const deleteByEmployeeId = async (employeeId: string): Promise<any> => {
    await pool.query('DELETE FROM membership WHERE employee_id=$1', [employeeId])
}

export const updateMembership = async (updatedMembership: any): Promise<string> => {
    const {
        id,
        employeeId,
        transactionId
    } = updatedMembership
    const query = `
    UPDATE membership
    SET employee_id = $1,
    transaction_id = $2
    WHERE id = $3
    RETURNING *;
    `
    const res = await pool.query(query, [
        employeeId,
        transactionId,
        id])
    const branchId = res.rows[0]
    return branchId
}



export default {
    create,
    deleteMembership,
    deleteByEmployeeId,
    getAllFromOrganization,
    getAllFromOrganizationByEmployeeByPeriod,
    getInfo,
    updateMembership
}