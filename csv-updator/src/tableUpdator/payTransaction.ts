const fs = require('fs');
import pool from '../config/pool'
import { v4 as uuid } from 'uuid'
import csv from 'csv-parser';


export const create = async (newMenu: any): Promise<any> => {
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

export const getEmployeeByEmployeeCodeByOrganization = async (organizationId: string, employeeCode: string): Promise<any> => {
    const { rows: employees } = await pool.query(`
    SELECT 
    e.id
    FROM employee e
    WHERE e.organization_id=$1 AND
    e.employee_code = $2`,
        [organizationId, employeeCode])
    return employees[0].id
}


export const getTransactionByTransactionCodeByOrganization = async (organizationId: string, transactionCode: string): Promise<any> => {
    const { rows: transactionDef } = await pool.query(`
    SELECT 
    td.id
    FROM transaction_definition td
    WHERE td.organization_id=$1 AND
    td.transaction_code = $2`,
        [organizationId, transactionCode])
    return transactionDef[0].id
}




const processCSV = async (organizationId: any, csvFile: any) => {
    try {
        const resultArray: any = [];

        // Define your conditions for each column here
        const processRow = (row: any) => {
            const employeeCode = row['TrnEmpCode'];
            const transactionCode = row['TrnParCode'];
            const transactionAmount = row['TrnAmount'];

            const payTransaction = {
                employeeCode,
                transactionCode,
                transactionAmount
            };

            resultArray.push(payTransaction);
        };


        const fileStream = await fs.createReadStream(csvFile);

        fileStream
            .pipe(csv())
            .on('data', (row: any) => {
                processRow(row);
            })
            .on('end',async  () => {
              
                    for (const payTransaction of resultArray) {
                        try {
                        payTransaction.organizationId = organizationId
                        const employeeId = await getEmployeeByEmployeeCodeByOrganization(organizationId, payTransaction.employeeCode)
                        payTransaction.employeeId = employeeId
                        const transactionId = await getTransactionByTransactionCodeByOrganization(organizationId, payTransaction.transactionCode)
                        payTransaction.transactionId = transactionId
                        await create(payTransaction)
                    } catch (err) {
                        console.log(payTransaction)
                        console.log(err)
                    }
                    }
                
               
        
            });

    } catch (err) {
        console.log(err)
    }

};

export default processCSV;