const fs = require('fs');
import pool from '../config/pool'
import { v4 as uuid } from 'uuid'
import csv from 'csv-parser';


export const createPeriodTransaction = async (newPeriodTransaction: any): Promise<any> => {
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
            period_id,
            transaction_id,
            transaction_amount 
            ) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        employeeId,
        organizationId,
        periodId,
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
    td.id,
    td.transaction_code,
    pd1.parameter_name as update_type_name
    FROM transaction_definition td
    INNER JOIN parameter_definition pd1 ON pd1.id = td.update_type
    WHERE td.organization_id=$1 AND
    td.transaction_code = $2`,
        [organizationId, transactionCode])
    return transactionDef[0]
}




const processCSV = async (organizationId: any, csvFile: any, userInfo: any) => {
    try {
        const resultArray: any = [];
        const {  periodId, userId } = userInfo

        // Define your conditions for each column here
        const processRow = (row: any) => {
            const employeeCode = row['TrnEmpCode'];
            const transactionCode = row['TrnParCode'];
            const transactionAmount = row['TrnAmount'];

            const payTransaction = {
                employeeCode,
                transactionCode,
                transactionAmount,
            };

            resultArray.push(payTransaction);
        };

        const fileStream = fs.createReadStream(csvFile);

        await new Promise((resolve: any) => {
            fileStream
                .pipe(csv())
                .on('data', (row: any) => {
                    processRow(row);
                })
                .on('end', async () => {
                    for (const payTransaction of resultArray) {
                        try {
                            payTransaction.organizationId = organizationId;
                            const employeeId = await getEmployeeByEmployeeCodeByOrganization(
                                organizationId,
                                payTransaction.employeeCode
                            );
                            payTransaction.employeeId = employeeId;
                            const {id: transactionId, update_type_name: updateTypeName, transaction_code: transactionCode} = await getTransactionByTransactionCodeByOrganization(
                                organizationId,
                                payTransaction.transactionCode
                            );
                            payTransaction.transactionId = transactionId;
                            payTransaction.organizationId = organizationId
                            if(updateTypeName == 'Input' && transactionCode != '10' && transactionCode != '12' && transactionCode != '14' && transactionCode != '16') {
                                const createdPayTransaction = await create(payTransaction, periodId);
                                const newPeriodTransaction = { 
                                    employeeId: createdPayTransaction.employee_id,
                                    transactionId: createdPayTransaction.transaction_id,
                                    organizationId,
                                    transactionAmount: createdPayTransaction.transaction_amount,
                                    userId, 
                                    periodId
                                }
                                await createPeriodTransaction(newPeriodTransaction)
                            }
                           
                        } catch (err) {
                            console.log('Error processing row:', err);
                            console.log(payTransaction)
                        }
                    }
                    console.log('Processing complete');
                    resolve(); // Resolve the promise when processing is complete.
                });
        });

        return resultArray;
    } catch (err) {
        console.error('Error in processCSV:', err);
    }
};


export default processCSV;