"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPeriodTransaction = exports.getTransactionByTransactionCodeByOrganization = exports.getEmployeeByEmployeeCodeByOrganization = exports.create = void 0;
const fs = require('fs');
const pool_1 = __importDefault(require("../config/pool"));
const uuid_1 = require("uuid");
const csv_parser_1 = __importDefault(require("csv-parser"));
const create = async (newMenu) => {
    const id = (0, uuid_1.v4)();
    const { employeeId, transactionId, totalLoan, transactionAmount, remainingAmount } = newMenu;
    const query = `
	INSERT INTO 
        loan_transaction 
        (
            id,
            employee_id,
            transaction_id,
            total_loan,
            transaction_amount,
            remaining_balance
            ) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;
    const res = await pool_1.default.query(query, [
        id,
        employeeId,
        transactionId,
        totalLoan,
        transactionAmount,
        remainingAmount
    ]);
    return res.rows[0];
};
exports.create = create;
const getEmployeeByEmployeeCodeByOrganization = async (organizationId, employeeCode) => {
    const { rows: employees } = await pool_1.default.query(`
    SELECT 
    e.id
    FROM employee e
    WHERE e.organization_id=$1 AND
    e.employee_code = $2`, [organizationId, employeeCode]);
    return employees[0].id;
};
exports.getEmployeeByEmployeeCodeByOrganization = getEmployeeByEmployeeCodeByOrganization;
const getTransactionByTransactionCodeByOrganization = async (organizationId, transactionCode) => {
    const { rows: transactionDef } = await pool_1.default.query(`
    SELECT 
    td.id
    FROM transaction_definition td
    WHERE td.organization_id=$1 AND
    td.transaction_code = $2`, [organizationId, transactionCode]);
    return transactionDef[0].id;
};
exports.getTransactionByTransactionCodeByOrganization = getTransactionByTransactionCodeByOrganization;
const createPeriodTransaction = async (newPeriodTransaction) => {
    const id = (0, uuid_1.v4)();
    const { organizationId, periodId, employeeId, transactionId, transactionAmount, userId } = newPeriodTransaction;
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
    `;
    const res = await pool_1.default.query(query, [
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
    ]);
    return res.rows[0];
};
exports.createPeriodTransaction = createPeriodTransaction;
const processCSV = async (organizationId, csvFile, userInfo) => {
    try {
        const resultArray = [];
        const { periodId, userId } = userInfo;
        const processRow = (row) => {
            const employeeCode = row['LoanEmpCode'];
            const transactionCode = row['LoanParCode'];
            const totalLoan = row['LoanOrgAmt'];
            const transactionAmount = row['LoanRepAmt'];
            const remainingAmount = row['LoanRemAmt'];
            const loanTransaction = {
                employeeCode,
                transactionCode,
                totalLoan,
                transactionAmount,
                remainingAmount,
            };
            resultArray.push(loanTransaction);
        };
        const fileStream = fs.createReadStream(csvFile);
        await new Promise((resolve) => {
            fileStream
                .pipe((0, csv_parser_1.default)())
                .on('data', (row) => {
                processRow(row);
            })
                .on('end', async () => {
                for (const loanTransaction of resultArray) {
                    try {
                        loanTransaction.organizationId = organizationId;
                        const employeeId = await (0, exports.getEmployeeByEmployeeCodeByOrganization)(organizationId, loanTransaction.employeeCode);
                        loanTransaction.employeeId = employeeId;
                        const transactionId = await (0, exports.getTransactionByTransactionCodeByOrganization)(organizationId, loanTransaction.transactionCode);
                        loanTransaction.transactionId = transactionId;
                        const createdLoanTransaction = await (0, exports.create)(loanTransaction);
                        const newPeriodTransaction = {
                            employeeId: createdLoanTransaction.employee_id,
                            transactionId: createdLoanTransaction.transaction_id,
                            organizationId,
                            transactionAmount: createdLoanTransaction.transaction_amount,
                            userId,
                            periodId
                        };
                        await (0, exports.createPeriodTransaction)(newPeriodTransaction);
                    }
                    catch (err) {
                        console.log('Error processing row:', err);
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
//# sourceMappingURL=loanTransaction.js.map