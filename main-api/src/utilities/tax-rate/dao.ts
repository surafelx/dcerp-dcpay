import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'

const defaultTaxRates = [

    {
        taxRateCode: '1',
        lowestRange: '0',
        highestRange: '600',
       rate: '0'
    },
    {
        taxRateCode: '2',
        lowestRange: '600.01',
        highestRange: '1650',
       rate: '0.1'
    },
    {
        taxRateCode: '3',
        lowestRange: '1650.01',
        highestRange: '3200',
       rate: '0.15'
    },
    {
        taxRateCode: '4',
        lowestRange: '3200.01',
        highestRange: '5250',
       rate: '0.2'
    },
    {
        taxRateCode: '5',
        lowestRange: '5250.01',
        highestRange: '7800',
       rate: '0.25'
    },
    {
        taxRateCode: '5',
        lowestRange: '7800.01',
        highestRange: '10900',
       rate: '0.3'
    },
    {
        taxRateCode: '5',
        lowestRange: '10900',
        highestRange: '999999',
       rate: '0.35'
    }
]

export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        taxRateCode,
        lowestRange,
        highestRange,
        taxRate
    } = newMenu
    const query = `
	INSERT INTO 
        tax_rate 
        (
            id,
            organization_id,
            tax_rate_code,
            lowest_range,
            highest_range,
            tax_rate
            ) 
    VALUES ($1, $2, $3, $4, $5, $6
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        taxRateCode,
        lowestRange,
        highestRange,
        taxRate
    ])
    return res.rows[0]
}



const setupApp = async(organizationId: any) => {

    for (const taxRate of defaultTaxRates) {
        const {
           taxRateCode,
           lowestRange,
           highestRange,
           rate,
        } = taxRate;

        const query = `
        INSERT INTO 
            tax_rate 
            (
                id,
                organization_id,
                tax_rate_code,
                lowest_range,
                highest_range,
                tax_rate
                ) 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `
        await pool.query(query, [uuid(), organizationId, taxRateCode, lowestRange, highestRange, rate]);
    }

}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: taxRates } = await pool.query(`
    SELECT 
    tr.id,
    tr.tax_rate_code,
    tr.lowest_range,
    tr.highest_range,
    tr.tax_rate
    FROM tax_rate tr
    WHERE tr.organization_id=$1`,
        [organizationId])
    return taxRates
}



export const deleteTaxRate = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM tax_rate WHERE id=$1', [branchId])
}


export const updateTaxRate = async (updatedTaxRate: any): Promise<string> => {
    const {
        id,
        taxRateCode,
        lowestRange,
        highestRange,
        taxRate
    } = updatedTaxRate
    const query = `
    UPDATE tax_rate
    SET tax_rate_code = $1,
    lowest_range = $2,
    highest_range = $3,
    tax_rate = $4
    WHERE id = $5
    RETURNING *;
    `
    const res = await pool.query(query, [
        taxRateCode,
        lowestRange,
        highestRange,
        taxRate,
        id])
    const branchId = res.rows[0]
    return branchId
}



export default {
    create,
    deleteTaxRate,
    getAllFromOrganization,
    updateTaxRate,
    setupApp
}