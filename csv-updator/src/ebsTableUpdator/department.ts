const fs = require('fs');
import pool from '../config/pool'
import { v4 as uuid } from 'uuid'
import csv from 'csv-parser';

const ADMINSTRATIVE_BRANCH = '1'
const DISTRIBUTION_BRANCH = '2'
const MEMBERSHIP_OFFICE_BRANCH = '3'
const TRANSLATION_OFFICE = '4'
const FCBH_BRANCH = '5'
const COMPREHENSIVE_PLAN_WEELIFE_BRANCH = '6'
const COMPREHENSIVE_PLAN_SEED_CO_BRANCH = '7'
const GOOD_SAMARITIAN_PROJECT_CANADA_BRANCH = '8'
const PROJECT_CHURCH_RELATION_BRANCH = '9'
const PENSION_BRANCH = '10'
const GOOD_SAMARITIAN_PROJECT_NORWAY_BRANCH = '11'

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
                            if (department.branchCode == ADMINSTRATIVE_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Administration');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == DISTRIBUTION_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Distribution');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == MEMBERSHIP_OFFICE_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Membership office');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == TRANSLATION_OFFICE) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Translation');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == FCBH_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'FCBH');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == COMPREHENSIVE_PLAN_WEELIFE_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Comprensive Plan-Weeclife');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == COMPREHENSIVE_PLAN_SEED_CO_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Comprensive Plan-Seed Co');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == GOOD_SAMARITIAN_PROJECT_CANADA_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Good Samaritan project-Canada');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == PROJECT_CHURCH_RELATION_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Project -Church Relation');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == PENSION_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Pension');
                                department.branchId = branch.id;
                            }
                            if (department.branchCode == GOOD_SAMARITIAN_PROJECT_NORWAY_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Good samaritan-Norway');
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