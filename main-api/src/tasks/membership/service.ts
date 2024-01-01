
import membershipDao from './dao'
import periodTransactionsService from '../../process/period-transactions/service'
import payrollProcessDao from '../../process/payroll-process/dao'
import employeeService from '../../file/employee-master/service'

const create = async (newMembership: any, userInfo: any): Promise<string> => {
    const { userId, periodId, organizationId } = userInfo
    newMembership.organizationId = organizationId
    const createdMembership = await membershipDao.create({ ...newMembership })
    const employeeData = await employeeService.getInfo(createdMembership.employee_id,)
    const tranDef = await payrollProcessDao.getTranCal(createdMembership.transaction_id, createdMembership.employee_id)
    const calculatedTranDef = payrollProcessDao.calculateTransactionCalculations(tranDef[0], employeeData)
    const newPeriodTransaction = {
        employeeId: createdMembership.employee_id,
        transactionId: createdMembership.transaction_id,
        organizationId,
        transactionAmount: calculatedTranDef.transaction_amount,
        userId,
        periodId
    }
    await periodTransactionsService.create(newPeriodTransaction)
    return createdMembership
}



const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await membershipDao.getAllFromOrganization(organizationId)

const getAllFromOrganizationByEmployeeByPeriod = async (organizationId: any, employeeId: any, userInfo: any): Promise<any[]> => await membershipDao.getAllFromOrganizationByEmployeeByPeriod(organizationId, employeeId, userInfo)


const getById = async (membershipId: any): Promise<any> => await membershipDao.getInfo(membershipId)


const deleteMembership = async (membershipId: string, userInfo: any): Promise<any> => {
    const membershipTransaction = await getById(membershipId)
    const { userId, organizationId, periodId } = userInfo
    await membershipDao.deleteMembership(membershipId)
    const deletedMembership = {
        employeeId: membershipTransaction.employee_id,
        transactionId: membershipTransaction.transaction_id,
        organizationId,
        transactionAmount: membershipTransaction.transaction_amount,
        userId,
        periodId
    }
    await periodTransactionsService.deletePeriodTransactionByPayTransaction(deletedMembership)

}

const updateMembership = async (newPayTransaction: any, userInfo: any): Promise<any> => {
    const updatedPayTransaction = await membershipDao.updateMembership(newPayTransaction)
    const { organizationId, userId, periodId } = userInfo
    const updatedPeriodTransaction = {
        employeeId: newPayTransaction.employeeId,
        transactionId: newPayTransaction.transactionId,
        organizationId,
        transactionAmount: newPayTransaction.transactionAmount,
        userId,
        periodId
    }
    await periodTransactionsService.updatePeriodTransaction(updatedPeriodTransaction)
    return updatedPayTransaction
}

// const updateMembership = async (menuLevelData: any): Promise<any> => await membershipDao.updateMembership(menuLevelData)

const deleteByEmployeeId = async (employeeId: string): Promise<any> => {
    await membershipDao.deleteByEmployeeId(employeeId)
}

export default {
    create,
    deleteMembership,
    deleteByEmployeeId,
    getAllFromOrganization,
    getAllFromOrganizationByEmployeeByPeriod,
    updateMembership
}