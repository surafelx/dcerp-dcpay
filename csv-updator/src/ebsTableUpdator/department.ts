const fs = require('fs');
import pool from '../config/pool'
import { v4 as uuid } from 'uuid'
import csv from 'csv-parser';

const DIREDAWA_BRANCH = '1'
const ADDISABABA_BRANCH = '2'


export const codeExists = async (department: any, organizationId: any): Promise<boolean> => {
    const { branchId, departmentCode } = department
    const { rows: res } = await pool.query(
        'select exists(select 1 from department where department_code = $1 AND branch_id = $2 AND organization_id = $3)',
        [departmentCode, branchId, organizationId])
    return res[0].exists
}

export const create = async (newDepartment: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        branchId,
        departmentCode,
        departmentName,
        permanentAccount,
        contractAccount
    } = newDepartment
    const query = `
	INSERT INTO 
        department 
        (
            id,
            organization_id,
            branch_id,
            department_code,
            department_name,
            permanent_account,
            contract_account
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        branchId,
        departmentCode,
        departmentName,
        permanentAccount || '0',
        contractAccount || '0'
    ])
    const department = res.rows[0]
    return department
}

export const getBranchByOrganizationByName = async (organizationId: any, branchName: any): Promise<any> => {

    const query = `
	SELECT
        *
    FROM 
    branch WHERE
    organization_id = $1 AND
    branch_name= $2
    `
    const res = await pool.query(query, [
        organizationId,
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
            const departmentCode = row['DepartmentCode'];
            const departmentName = row['DepartmentName'];

            const department = {
                branchCode,
                departmentCode,
                departmentName,
                permanentAccount: '',
                contractAccount: '',
            };
            resultArray.push(department);
        };

        const fileStream = fs.createReadStream(csvFile);

        await new Promise((resolve: any, reject: any) => {
            fileStream
                .pipe(csv())
                .on('data', (row: any) => {
                    processRow(row);
                })
                .on('end', async () => {
                    for (const department of resultArray) {
                        try {
                            if (department.branchCode == DIREDAWA_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Dire Dewa Office');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == ADDISABABA_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Addis Ababa Office');
                                department.branchId = branch.id;
                            }
                            department.organizationId = organizationId;
                            const doesExist = await codeExists(department, organizationId)
                            if (!doesExist)
                                await create(department);
                        } catch (err) {
                            console.log('Error processing row:', err);
                            console.log('Row data:', department);
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