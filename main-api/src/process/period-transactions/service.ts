
import periodTransactionsDao from './dao'

const create = async (newPeriodTransaction: any): Promise<string> => await periodTransactionsDao.create({ ...newPeriodTransaction })

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await periodTransactionsDao.getAllFromOrganization(organizationId)


const deletePeriodTransaction = async (userId: string): Promise<any> => await periodTransactionsDao.deletePeriodTransaction(userId)

const deletePeriodTransactionByPayTransaction = async (deletedPayTransaction: any): Promise<any> => {
    await periodTransactionsDao.deletePeriodTransactionByPayTransaction(deletedPayTransaction)
}


const updatePeriodTransaction = async (periodTransaction: any): Promise<any> => {await periodTransactionsDao.updatePeriodTransaction(periodTransaction)}


export default {
    create,
    deletePeriodTransaction,
    deletePeriodTransactionByPayTransaction,
    getAllFromOrganization,
    updatePeriodTransaction,
}