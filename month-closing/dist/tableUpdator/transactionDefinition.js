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
const create = async (newTransactionDefinition) => {
    const id = (0, uuid_1.v4)();
    const { organizationId, branchId, transactionCode, transactionName, shortName, transactionType, updateType, permanent, taxable, unTaxableLimit, affectByLeave, leaveDays, affectBackPayroll, affectBeneficiary, transactionGroup, glEntryBy, directAccount, contractGLAccount } = newTransactionDefinition;
    const query = `
	INSERT INTO 
        transaction_definition 
        (
            id,
            organization_id,
            branch_id,
            transaction_code,
            transaction_name,
            short_name,
            transaction_type,
            update_type,
            permanent,
            taxable,
            un_taxable_limit,
            affect_by_leave,
            leave_days,
            affect_back_payroll,
            affect_beneficiary,
            transaction_group,
            gl_entry_by,
            direct_account,
            contract_gl_account
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    RETURNING *;
    `;
    const res = await pool_1.default.query(query, [
        id,
        organizationId,
        branchId,
        transactionCode,
        transactionName,
        shortName,
        transactionType,
        updateType,
        permanent || false,
        taxable || false,
        unTaxableLimit,
        affectByLeave || false,
        leaveDays,
        affectBackPayroll || false,
        affectBeneficiary || false,
        transactionGroup,
        glEntryBy,
        directAccount,
        contractGLAccount
    ]);
    return res.rows[0];
};
exports.create = create;
const processCSV = async (csvFile) => {
    try {
        const resultArray = [];
        const processRow = (row) => {
            const transactionCode = row['ParaCode'];
            const transactionName = row['ParaFName'];
            const shortName = row['ParaSname'];
            const transactionType = row['ParTranType'];
            const updateType = row['ParUpadteType'];
            const permanent = row['ParaPermanet'];
            const taxable = row['ParTaxable'];
            const transactionGroup = row['ParGroup'];
            const glEntryBy = row['ParGIType'];
            const parGICC = row['ParGICC'];
            const directAccount = row['ParGIMain'];
            const parGISub = row['ParGISub'];
            const affectByLeave = row['ParAffectedbyLeave'];
            const leaveDays = row['ParAffecteddays'];
            const contractGLAccount = row['ParGlCCcontra'];
            const parGIMaincontra = row['ParGlMaincontra'];
            const parGISubcontra = row['ParGlSubcontra'];
            const affectBackPayroll = row['ParaBackpay'];
            const unTaxableLimit = row['ParaUntaxableLimit'];
            const affectBeneficiary = row['ParBeneficiary'];
            const branch = {
                transactionCode,
                transactionName,
                shortName,
                transactionType,
                updateType,
                permanent,
                taxable,
                transactionGroup,
                glEntryBy,
                parGICC,
                directAccount,
                parGISub,
                affectByLeave,
                leaveDays,
                contractGLAccount,
                parGIMaincontra,
                parGISubcontra,
                affectBackPayroll,
                unTaxableLimit,
                affectBeneficiary
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
            for (const transactionDefinition of resultArray) {
                const organizationId = '2e688881-8e77-49a6-8601-dd718e11e438';
                transactionDefinition.organizationId = organizationId;
                transactionDefinition.branchId = '';
                const transactionDefinitionId = await (0, exports.create)(transactionDefinition);
                console.log(transactionDefinitionId);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = processCSV;
//# sourceMappingURL=transactionDefinition.js.map