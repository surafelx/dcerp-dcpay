import periodTransactionsDao from "./dao";

const create = async (newPeriodTransaction: any): Promise<string> =>
  await periodTransactionsDao.create({ ...newPeriodTransaction });

const getAllFromOrganization = async (organizationId: any): Promise<any[]> =>
  await periodTransactionsDao.getAllFromOrganization(organizationId);

const getEmployeeLoanTransactionByPeriod = async (
  organizationId: any,
  employeeId: any,
  userInfo: any
): Promise<any[]> =>
  await periodTransactionsDao.getEmployeeLoanTransactionByPeriod(
    organizationId,
    employeeId,
    userInfo
  );

const deletePeriodTransaction = async (userId: string): Promise<any> =>
  await periodTransactionsDao.deletePeriodTransaction(userId);

const deleteByEmployeeId = async (employeeId: string): Promise<any> =>
  await periodTransactionsDao.deleteByEmployeeId(employeeId);

const deletePeriodTransactionByPayTransaction = async (
  deletedPayTransaction: any
): Promise<any> => {
  await periodTransactionsDao.deletePeriodTransactionByPayTransaction(
    deletedPayTransaction
  );
};

const updatePeriodTransaction = async (
  periodTransaction: any
): Promise<any> => {
  await periodTransactionsDao.updatePeriodTransaction(periodTransaction);
};

const checkTransactionIdExists = async (transactionId: any): Promise<any> =>
  await periodTransactionsDao.checkTransactionIdExists(transactionId);

export default {
  create,
  checkTransactionIdExists,
  deletePeriodTransaction,
  getEmployeeLoanTransactionByPeriod,
  deleteByEmployeeId,
  deletePeriodTransactionByPayTransaction,
  getAllFromOrganization,
  updatePeriodTransaction,
};
