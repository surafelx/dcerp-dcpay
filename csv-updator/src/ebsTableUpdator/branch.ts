const fs = require('fs');
import pool from '../config/pool'
import { v4 as uuid } from 'uuid'
import csv from 'csv-parser';


export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        branchCode,
        branchName
    } = newMenu
    const query = `
	INSERT INTO 
        branch 
        (
            id,
            organization_id,
            branch_code,
            branch_name
            ) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        branchCode,
        branchName
    ])
    const branch = res.rows[0]
    return branch
}

export const branchCodeExists = async (branchCode: any, organizationId: any) => {
    const { rows: res } = await pool.query(
        'select exists(select 1 from branch where branch_code=$1 and organization_id=$2)',
        [branchCode, organizationId])
    return res[0].exists
}

const processCSV = async (organizationId: any, csvFile: any) => {
    try {
        const resultArray: any = [];

        // Define your conditions for each column here
        const processRow = (row: any) => {
            const branchCode = row['BranchCode'];
            const branchName = row['BranchName'];

            const branch = {
                branchName,
                branchCode,
            };

            resultArray.push(branch);
        };

        const fileStream = fs.createReadStream(csvFile);

        await new Promise((resolve: any, reject): any => {
            fileStream
                .pipe(csv())
                .on('data', (row: any) => {
                    processRow(row);
                })
                .on('end', async () => {
                    for (const branch of resultArray) {
                        branch.organizationId = organizationId;
                        try {
                            const doesExist = await branchCodeExists(branch.branchCode, organizationId)
                            if (!doesExist)
                                await create(branch);
                        } catch (err) {
                            console.log('Error processing row:', err);
                            console.log('Row data:', branch);
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