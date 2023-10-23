"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const fs = require('fs');
const pool_1 = __importDefault(require("../config/pool"));
const uuid_1 = require("uuid");
const csv_parser_1 = __importDefault(require("csv-parser"));
const create = async (newMenu) => {
    const id = (0, uuid_1.v4)();
    const { organizationId, branchCode, branchName } = newMenu;
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
    `;
    const res = await pool_1.default.query(query, [
        id,
        organizationId,
        branchCode,
        branchName
    ]);
    const branch = res.rows[0];
    return branch;
};
exports.create = create;
const processCSV = async (csvFile) => {
    try {
        const resultArray = [];
        const processRow = (row) => {
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
            .pipe((0, csv_parser_1.default)())
            .on('data', (row) => {
            processRow(row);
        })
            .on('end', async () => {
            for (const branch of resultArray) {
                const organizationId = '2e688881-8e77-49a6-8601-dd718e11e438';
                branch.organizationId = organizationId;
                const branchId = await (0, exports.create)(branch);
                console.log(branchId);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = processCSV;
//# sourceMappingURL=parameterDefinition.js.map