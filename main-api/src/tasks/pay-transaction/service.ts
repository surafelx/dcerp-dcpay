
import payTransactionDao from './dao'
import periodTransactionsService from '../../process/period-transactions/service'

const create = async (newPayTransaction: any, userInfo: any): Promise<string> => {
    const createdPayTransaction = await payTransactionDao.create({ ...newPayTransaction })
    const { userId, periodId, organizationId} = userInfo
    const newPeriodTransaction = { 
        employeeId: createdPayTransaction.employee_id,
        transactionId: createdPayTransaction.transaction_id,
        organizationId,
        transactionAmount: createdPayTransaction.transaction_amount,
        userId, 
        periodId
    }
await periodTransactionsService.create(newPeriodTransaction)
return createdPayTransaction

}

const getById = async (payTransactionId: any): Promise<any> => await payTransactionDao.getById(payTransactionId)

const getAllFromOrganization = async (organizationId: any, employeeId: any, userInfo: any): Promise<any[]> => await payTransactionDao.getAllFromOrganization(organizationId, employeeId, userInfo)

const deletePayTransaction = async (payTransactionId: string, userInfo: any): Promise<any> => {
    const payTransaction = await getById(payTransactionId)
    const {userId, organizationId, periodId} = userInfo
    await payTransactionDao.deletePayTransaction(payTransactionId)
    const deletedPayTransaction = { 
        employeeId: payTransaction.employee_id,
        transactionId: payTransaction.transaction_id,
        organizationId,
        transactionAmount: payTransaction.transaction_amount,
        userId, 
        periodId
    }
    await periodTransactionsService.deletePeriodTransactionByPayTransaction(deletedPayTransaction)
}

const updatePayTransaction = async (newPayTransaction: any, userInfo: any): Promise<any> => {
    const updatedPayTransaction = await payTransactionDao.updatePayTransaction(newPayTransaction)
    const {organizationId, userId, periodId} = userInfo
    const updatedPeriodTransaction = { 
        employeeId: updatedPayTransaction.employee_id,
        transactionId: updatedPayTransaction.transaction_id,
        organizationId,
        transactionAmount: updatedPayTransaction.transaction_amount,
        userId, 
        periodId
    }
    await periodTransactionsService.updatePeriodTransaction(updatedPeriodTransaction)
    return updatedPayTransaction
}

export default {
    create,
    deletePayTransaction,
    getAllFromOrganization,
    updatePayTransaction
}