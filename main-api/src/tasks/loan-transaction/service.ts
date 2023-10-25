
import loanTransactionDao from './dao'
import periodTransactionsService from '../../process/period-transactions/service'

const create = async (newLoanTransaction: any, userInfo: any): Promise<string> => {
    const { userId, periodId, organizationId} = userInfo
    const createdLoanTransaciton =  await loanTransactionDao.create({ ...newLoanTransaction })
    const newPeriodTransaction = { 
        employeeId: createdLoanTransaciton.employee_id,
        transactionId: createdLoanTransaciton.transaction_id,
        organizationId,
        transactionAmount: createdLoanTransaciton.transaction_amount,
        userId, 
        periodId
    }
    await periodTransactionsService.create(newPeriodTransaction)
    return createdLoanTransaciton
}

const getAllFromOrganization = async (organizationId: any, employeeId: any): Promise<any[]> => await loanTransactionDao.getAllFromOrganization(organizationId, employeeId)

const getById = async (loanTransactionId: any): Promise<any> => await loanTransactionDao.getById(loanTransactionId)


const deleteLoanTransaction = async (loanTransactionId: string, userInfo: any): Promise<any> => {
    const loanTransaction = await getById(loanTransactionId)
    const {userId, organizationId, periodId} = userInfo
    await loanTransactionDao.deleteLoanTransaction(userId)
    const deletedLoanTransaction = { 
        employeeId: loanTransaction.employee_id,
        transactionId: loanTransaction.transaction_id,
        organizationId,
        transactionAmount: loanTransaction.transaction_amount,
        userId, 
        periodId
    }
    await periodTransactionsService.deletePeriodTransactionByPayTransaction(deletedLoanTransaction)
   
}

const updateLoanTransaction = async (newPayTransaction: any, userInfo: any): Promise<any> => {
    const updatedLoanTransaction = await loanTransactionDao.updateLoanTransaction(newPayTransaction)
    const {organizationId, userId, periodId} = userInfo
    const updatedPeriodTransaction = { 
        employeeId: updatedLoanTransaction.employee_id,
        transactionId: updatedLoanTransaction.transaction_id,
        organizationId,
        transactionAmount: updatedLoanTransaction.transaction_amount,
        userId, 
        periodId
    }
    await periodTransactionsService.updatePeriodTransaction(updatedPeriodTransaction)
    return updatedLoanTransaction
}

export default {
    create,
    deleteLoanTransaction,
    getAllFromOrganization,
    updateLoanTransaction
}