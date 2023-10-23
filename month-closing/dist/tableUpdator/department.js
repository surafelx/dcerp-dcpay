"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBranchByName = exports.create = void 0;
const fs = require('fs');
const pool_1 = __importDefault(require("../config/pool"));
const uuid_1 = require("uuid");
const csv_parser_1 = __importDefault(require("csv-parser"));
const MANAGEMENT_GROUP_BRANCH = '1';
const COMMERCE_AND_FINANCE_BRANCH = '2';
const PRODUCTION_OPERATION_BRANCH = '3';
const CONTRACT_EMPLOYEE_BRANCH = '4';
const ALL_BRANCH = '99';
const create = async (newDepartment) => {
    const id = (0, uuid_1.v4)();
    const { organizationId, branchId, departmentCode, departmentName, permanentAccount, contractAccount } = newDepartment;
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
    `;
    const res = await pool_1.default.query(query, [
        id,
        organizationId,
        branchId,
        departmentCode,
        departmentName,
        permanentAccount,
        contractAccount
    ]);
    const department = res.rows[0];
    return department;
};
exports.create = create;
const getBranchByName = async (branchName) => {
    const query = `
	SELECT
        *
    FROM 
    branch WHERE
    branch_name=$1
    `;
    const res = await pool_1.default.query(query, [
        branchName
    ]);
    const branch = res.rows[0];
    return branch;
};
exports.getBranchByName = getBranchByName;
const processCSV = async (organizationId, csvFile) => {
    try {
        const resultArray = [];
        const processRow = (row) => {
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
        await new Promise((resolve, reject) => {
            fileStream
                .pipe((0, csv_parser_1.default)())
                .on('data', (row) => {
                processRow(row);
            })
                .on('end', async () => {
                for (const department of resultArray) {
                    try {
                        if (department.branchCode == MANAGEMENT_GROUP_BRANCH) {
                            const branch = await (0, exports.getBranchByName)('Management Group');
                            department.branchId = branch.id;
                        }
                        if (department.branchCode == COMMERCE_AND_FINANCE_BRANCH) {
                            const branch = await (0, exports.getBranchByName)('Commerce and Finance');
                            department.branchId = branch.id;
                        }
                        if (department.branchCode == PRODUCTION_OPERATION_BRANCH) {
                            const branch = await (0, exports.getBranchByName)('Production Operation');
                            department.branchId = branch.id;
                        }
                        if (department.branchCode == CONTRACT_EMPLOYEE_BRANCH) {
                            const branch = await (0, exports.getBranchByName)('Contract Employee');
                            department.branchId = branch.id;
                        }
                        if (department.branchCode == ALL_BRANCH) {
                            const branch = await (0, exports.getBranchByName)('All');
                            department.branchId = branch.id;
                        }
                        department.organizationId = organizationId;
                        await (0, exports.create)(department);
                    }
                    catch (err) {
                        console.log('Error processing row:', err);
                        console.log('Row data:', department);
                    }
                }
                console.log('Processing complete');
                resolve();
            });
        });
        return resultArray;
    }
    catch (err) {
        console.error('Error in processCSV:', err);
    }
};
exports.default = processCSV;
//# sourceMappingURL=department.js.map