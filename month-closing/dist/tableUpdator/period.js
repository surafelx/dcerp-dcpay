"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = __importDefault(require("../config/pool"));
const uuid_1 = require("uuid");
const createPayTransaction = async (newMenu) => {
    const id = (0, uuid_1.v4)();
    const { employeeId, transactionId, transactionAmount } = newMenu;
    const query = `
	INSERT INTO 
        pay_transaction 
        (
            id,
            employee_id,
            transaction_id,
            transaction_amount 
            ) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    const res = await pool_1.default.query(query, [
        id,
        employeeId,
        transactionId,
        transactionAmount
    ]);
    return res.rows[0];
};
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
const updateCurrentPeriod = async (organizationId, periodId, userId) => {
    const { rows: currentPeriods } = await pool_1.default.query(`
   UPDATE periods SET 
   period_paid = $1, 
   period_current = $2, 
   period_back = $3, 
   period_proof = $4, 
   period_final = $5, 
   period_report = $6,
   period_process = $7 
   WHERE id = $8 RETURNING *;`, [true, false, true, true, true, true, true, periodId]);
    const current = currentPeriods[0];
    const nextPeriod = {
        periodCount: Number(current.period_count) + 1,
    };
    const { rows: openedPeriod } = await pool_1.default.query(`
   UPDATE periods SET 
   period_paid = $1, 
   period_current = $2, 
   period_back = $3, 
   period_proof = $4, 
   period_final = $5, 
   period_report = $6,
   period_process = $7 
   WHERE period_count = $8 AND organization_id = $9 RETURNING *;`, [false, true, false, false, false, false, false, nextPeriod.periodCount, organizationId]);
    const { rows: periodTransactions } = await pool_1.default.query(`
   SELECT 
   pts.id, 
   employee_id,
   transaction_id, 
   td.permanent,
   td.transaction_name,
   transaction_amount
   FROM period_transactions pts
   INNER JOIN transaction_definition td ON td.id = pts.transaction_id 
   WHERE pts.organization_id=$1 AND pts.period_id=$2`, [organizationId, periodId]);
    for (const pt of periodTransactions) {
        try {
            if (pt.permanent) {
                const createdPayTransaction = await createPayTransaction({ organizationId, employeeId: pt.employee_id, transactionId: pt.transaction_id, transactionAmount: pt.transaction_amount });
                const newPeriodTransaction = {
                    employeeId: createdPayTransaction.employee_id,
                    transactionId: createdPayTransaction.transaction_id,
                    organizationId,
                    transactionAmount: createdPayTransaction.transaction_amount,
                    userId,
                    periodId: openedPeriod[0].id
                };
                await createPeriodTransaction(newPeriodTransaction);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.default = updateCurrentPeriod;
//# sourceMappingURL=period.js.map