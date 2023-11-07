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
        parameter_defintion 
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



const processCSV = async (csvFile: any) => {
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
                    const organizationId = '2e688881-8e77-49a6-8601-dd718e11e438'
                    branch.organizationId = organizationId
                    const branchId = await create(branch)
                    console.log(branchId)
                }
        
            });

    } catch (err) {
        console.log(err)
    }

};

export default processCSV;