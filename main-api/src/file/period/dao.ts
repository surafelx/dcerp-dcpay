import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newPeriod: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        periodCount,
        periodName,
        periodYear,
        monthName,
        startDate,
        endDate,
        periodPaid,
        periodCurrent,
        periodBack,
        periodProof,
        periodFinal,
        periodReport
    } = newPeriod
    const query = `
	INSERT INTO 
        periods 
        (
            id,
            organization_id,
            period_count,
            period_name, 
            period_year,
            month_name, 
            start_date,
            end_date,
            period_paid,
            period_current,
            period_back,
            period_proof,
            period_final,
            period_report
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        periodCount,
        periodName,
        periodYear,
        monthName,
        startDate,
        endDate,
        periodPaid,
        periodCurrent,
        periodBack,
        periodProof,
        periodFinal,
        periodReport
    ])
    return res.rows[0]
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: Periods } = await pool.query(`
    SELECT 
    id,
    organization_id,
    period_count,
    period_name, 
    period_year,
    month_name, 
    start_date,
    end_date,
    period_paid,
    period_current,
    period_back,
    period_proof,
    period_final,
    period_report,
    period_process
    FROM periods
    WHERE organization_id=$1`,
        [organizationId])
    return Periods
}



export const deletePeriod = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM periods WHERE id=$1', [branchId])
}


export const updatePeriod = async (updatedPeriod: any): Promise<string> => {
    const {
        id,
        periodCount,
        periodName,
        periodYear,
        monthName,
        startDate,
        endDate,
        periodPaid,
        periodCurrent,
        periodBack,
        periodProof,
        periodFinal,
        periodReport
    } = updatedPeriod
    const query = `
    UPDATE 
    periods
    SET 
    period_count = $1,
    period_name = $2,
    period_year = $3,
    month_name = $4,
    start_date = $5,
    end_date = $6,
    period_paid = $7,
    period_current = $8,
    period_back = $9,
    period_proof = $10,
    period_final = $11,
    period_report = $12
    WHERE id = $13
    RETURNING *;
    `
    const res = await pool.query(query, [
        periodCount,
        periodName,
        periodYear,
        monthName,
        startDate,
        endDate,
        periodPaid,
        periodCurrent,
        periodBack,
        periodProof,
        periodFinal,
        periodReport,
        id])
    const branchId = res.rows[0]
    return branchId
}

export const getCurrentPeriod = async (organizationId: string): Promise<any> => {
    const { rows: Periods } = await pool.query(`
    SELECT 
    id,
    organization_id,
    period_count,
    period_name, 
    period_year,
    month_name, 
    start_date,
    end_date,
    period_paid,
    period_current,
    period_back,
    period_proof,
    period_final,
    period_report,
    period_process
    FROM periods
    WHERE organization_id=$1 AND
    period_current = true`,
        [organizationId])
    return Periods
}




export default {
    create,
    deletePeriod,
    getAllFromOrganization,
    getCurrentPeriod,
    updatePeriod
}