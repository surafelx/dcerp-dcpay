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


        const fileStream = await fs.createReadStream(csvFile);

        fileStream
            .pipe(csv())
            .on('data', (row: any) => {
                processRow(row);
            })
            .on('end',async  () => {
                for (const branch of resultArray) {
                    branch.organizationId = organizationId
                    await create(branch)
                }
        
            });

    } catch (err) {
        console.log(err)
    }

};

export default processCSV;