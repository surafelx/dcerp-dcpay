const fs = require('fs');
import pool from '../config/pool'
import { v4 as uuid } from 'uuid'
import csv from 'csv-parser';

const MANAGEMENT_GROUP_BRANCH = '1'
const COMMERCE_AND_FINANCE_BRANCH = '2'
const PRODUCTION_OPERATION_BRANCH = '3'
const CONTRACT_EMPLOYEE_BRANCH = '4'
const ALL_BRANCH = '99'


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
        permanentAccount,
        contractAccount
    ])
    const department = res.rows[0]
    return department
}

export const getBranchByName = async (branchName: any): Promise<any> => {

    const query = `
	SELECT
        *
    FROM 
    branch WHERE
    branch_name=$1
    `
    const res = await pool.query(query, [
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
                            if (department.branchCode == MANAGEMENT_GROUP_BRANCH) {
                                const branch = await getBranchByName('Management Group');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == COMMERCE_AND_FINANCE_BRANCH) {
                                const branch = await getBranchByName('Commerce and Finance');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == PRODUCTION_OPERATION_BRANCH) {
                                const branch = await getBranchByName('Production Operation');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == CONTRACT_EMPLOYEE_BRANCH) {
                                const branch = await getBranchByName('Contract Employee');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == ALL_BRANCH) {
                                const branch = await getBranchByName('All');
                                department.branchId = branch.id;
                            }
                            department.organizationId = organizationId;
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