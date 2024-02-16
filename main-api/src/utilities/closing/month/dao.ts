import pool from "../../../config/pool";
import { v4 as uuid } from "uuid";

const createPayTransaction = async (newMenu: any) => {
  const id = uuid();
  const {
    organizationId,
    periodId,
    employeeId,
    transactionId,
    transactionAmount,
  } = newMenu;
  const query = `
	INSERT INTO 
        pay_transaction 
        (
            id,
            organization_id,
            period_id,
            employee_id,
            transaction_id,
            transaction_amount 
            ) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;
  const res = await pool.query(query, [
    id,
    organizationId,
    periodId,
    employeeId,
    transactionId,
    transactionAmount,
  ]);
  return res.rows[0];
};

export const createLoanTransaction = async (
  newLoanTransaction: any
): Promise<any> => {
  const { organizationId, employeeId, transactionId, transactionAmount } =
    newLoanTransaction;
  const { rows: loanTransaction } = await pool.query(
    `
    SELECT 
    *
    FROM loan_transaction
    WHERE
    transaction_id = $1 AND 
    employee_id = $2 AND
    transaction_amount = $3 AND
    organization_id = $4

    `,
    [transactionId, employeeId, transactionAmount, organizationId]
  );
  const { total_loan: totalLoan, remaining_balance: remainingBalance } =
    loanTransaction[0];
  const id = uuid();
  const query = `
	INSERT INTO 
        loan_transaction 
        (
            id,
            employee_id,
            organization_id,
            transaction_id,
            total_loan,
            transaction_amount,
            remaining_balance
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `;
  const res = await pool.query(query, [
    id,
    employeeId,
    organizationId,
    transactionId,
    totalLoan,
    transactionAmount,
    remainingBalance,
  ]);
  return res.rows[0];
};

const createPeriodTransaction = async (
  organizationId: any,
  userId: any,
  newPeriodTransaction: any
) => {
  const id = uuid();
  const { periodId, employeeId, transactionId, transactionAmount } =
    newPeriodTransaction;
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

const closeMonth = async (organizationId: any, userId: any, periodId: any) => {
  const { rows: currentPeriods } = await pool.query(
    `
     UPDATE periods SET
     period_paid = $1,
     period_current = $2,
     period_back = $3,
     period_proof = $4,
     period_final = $5,
     period_report = $6,
     period_process = $7
     WHERE id = $8 RETURNING *;`,
    [true, false, true, true, true, true, true, periodId]
  );
  const current = currentPeriods[0];
  const nextPeriod = {
    periodCount: Number(current.period_count) + 1,
  };
  const { rows: openedPeriod } = await pool.query(
    `
     UPDATE periods SET
     period_paid = $1,
     period_current = $2,
     period_back = $3,
     period_proof = $4,
     period_final = $5,
     period_report = $6,
     period_process = $7
     WHERE period_count = $8 AND organization_id = $9 RETURNING *;`,
    [
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      nextPeriod.periodCount,
      organizationId,
    ]
  );
  const { rows: periodTransactions } = await pool.query(
    `
   SELECT 
   pts.id, 
   pts.employee_id,
   pts.transaction_id, 
   td.permanent,
   td.transaction_name,
   pd.parameter_name as transaction_group_name,
   pts.transaction_amount
   FROM period_transactions pts
   INNER JOIN transaction_definition td ON td.id = pts.transaction_id 
   INNER JOIN parameter_definition pd ON pd.id = td.transaction_group
   WHERE pts.organization_id=$1 AND pts.period_id=$2`,
    [organizationId, periodId]
  );

  for (const pt of periodTransactions) {
    try {
      if (pt.permanent && pt.transaction_group_name != "Loan") {
        const createdPayTransaction = await createPayTransaction({
          organizationId,
          periodId,
          employeeId: pt.employee_id,
          transactionId: pt.transaction_id,
          transactionAmount: pt.transaction_amount,
        });
        const newPeriodTransactionForPay = {
          employeeId: createdPayTransaction.employee_id,
          transactionId: createdPayTransaction.transaction_id,
          transactionAmount: createdPayTransaction.transaction_amount,
          periodId: openedPeriod[0].id,
        };
        await createPeriodTransaction(
          organizationId,
          userId,
          newPeriodTransactionForPay
        );
      }
      if (pt.transaction_group_name == "Loan") {
        const createdLoanTransaction = await createLoanTransaction({
          organizationId,
          periodId,
          employeeId: pt.employee_id,
          transactionId: pt.transaction_id,
          transactionAmount: pt.transaction_amount,
        });
        const newPeriodTransactionForLoan = {
          employeeId: createdLoanTransaction.employee_id,
          transactionId: createdLoanTransaction.transaction_id,
          transactionAmount: createdLoanTransaction.transaction_amount,
          periodId: openedPeriod[0].id,
        };
        await createPeriodTransaction(
          organizationId,
          userId,
          newPeriodTransactionForLoan
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export default {
  closeMonth,
};
