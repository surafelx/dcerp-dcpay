import pool from "../../config/pool";
import { v4 as uuid } from "uuid";

export const create = async (newPeriodTransaction: any): Promise<any> => {
  const id = uuid();
  const {
    organizationId,
    periodId,
    employeeId,
    transactionId,
    transactionAmount,
    userId,
  } = newPeriodTransaction;
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
  const res = await pool.query(query, [
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
    new Date(),
  ]);
  return res.rows[0];
};

export const getAllFromOrganization = async (
  organizationId: string
): Promise<any> => {
  const { rows: employees } = await pool.query(
    `
    SELECT 
    *
    FROM period_transactions pts
    WHERE pts.organization_id=$1`,
    [organizationId]
  );
  return employees;
};

export const getEmployeeLoanTransactionByPeriod = async (
  organizationId: string,
  employeeId: any,
  userInfo: any
): Promise<any> => {
  const { periodId } = userInfo;
  const { rows: employees } = await pool.query(
    `
    SELECT 
    DISTINCT
    pts.id,
    pts.transaction_id,
    td1.transaction_name,
    td1.transaction_code,
    pd3.parameter_name as transaction_group_name,
    pts.transaction_amount,
    lt1.remaining_balance,
    lt1.total_loan,
    em1.employee_code,
    em1.first_name as employee_first_name, 
    em1.last_name as employee_last_name
    FROM period_transactions pts
    INNER JOIN employee em1 ON em1.id = pts.employee_id
    INNER JOIN loan_transaction lt1 ON lt1.employee_id = pts.employee_id
    INNER JOIN transaction_definition td1 ON td1.id = pts.transaction_id
    INNER JOIN parameter_definition pd3 ON pd3.id = td1.transaction_group
    WHERE pts.organization_id=$1 AND pts.employee_id = $2 AND pts.period_id = $3 AND pd3.parameter_name = 'Loan'`,
    [organizationId, employeeId, periodId]
  );
  return employees;
};

export const deletePeriodTransaction = async (
  branchId: string
): Promise<any> => {
  await pool.query("DELETE FROM period_transactions WHERE id=$1", [branchId]);
};

export const deletePeriodTransactionByPayTransaction = async (
  deletedPayTransaction: any
): Promise<any> => {
  const {
    organizationId,
    periodId,
    employeeId,
    transactionId,
    transactionAmount,
  } = deletedPayTransaction;
  await pool.query(
    `
    DELETE 
    FROM 
    period_transactions 
    WHERE 
    organization_id=$1 AND
    period_id=$2 AND
    employee_id=$3 AND
    transaction_id=$4 AND
    transaction_amount=$5`,
    [organizationId, periodId, employeeId, transactionId, transactionAmount]
  );
};

export const updatePeriodTransaction = async (
  updatedPeriodTransaction: any
): Promise<string> => {
  const {
    organizationId,
    employeeId,
    transactionId,
    transactionAmount,
    periodId,
  } = updatedPeriodTransaction;
  const query = `
    UPDATE period_transactions
    SET 
    transaction_amount = $1
    WHERE 
    organization_id= $2 AND
    employee_id = $3 AND
    transaction_id = $4 AND 
    period_id = $5 
    RETURNING *;
    `;
  const res = await pool.query(query, [
    transactionAmount,
    organizationId,
    employeeId,
    transactionId,
    periodId,
  ]);
  return res.rows[0];
};

export const deleteByEmployeeId = async (employeeId: string): Promise<any> => {
  await pool.query("DELETE FROM period_transactions WHERE employee_id=$1", [
    employeeId,
  ]);
};

export const checkTransactionIdExists = async (
  transactionId: any
): Promise<boolean> => {
  const { rows: res } = await pool.query(
    "select exists(select 1 from period_transactions where transaction_id = $1)",
    [transactionId]
  );
  return res[0].exists;
};

export default {
  create,
  checkTransactionIdExists,
  deletePeriodTransaction,
  deletePeriodTransactionByPayTransaction,
  deleteByEmployeeId,
  getAllFromOrganization,
  getEmployeeLoanTransactionByPeriod,
  updatePeriodTransaction,
};
