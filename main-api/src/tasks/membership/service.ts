
import membershipDao from './dao'
import periodTransactionsService from '../../process/period-transactions/service'
import payrollProcessDao from '../../process/payroll-process/dao'

const create = async (newMembership: any, userInfo: any): Promise<string> => {
    const { userId, periodId, organizationId} = userInfo
    const createdMembership =  await membershipDao.create({ ...newMembership })
    const tranDef = await payrollProcessDao.getTranCal(createdMembership.transaction_id, createdMembership.employee_id)
    const calculatedTranDef = payrollProcessDao.calculateTransactionCalculations(tranDef[0])
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

const getById = async (membershipId: any): Promise<any> => await membershipDao.getInfo(membershipId)


const deleteMembership = async (membershipId: string, userInfo: any): Promise<any> => {
    const membershipTransaction = await getById(membershipId)
    const {userId, organizationId, periodId} = userInfo
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

const updateMembership = async (menuLevelData: any): Promise<any> => await membershipDao.updateMembership(menuLevelData)


export default {
    create,
    deleteMembership,
    getAllFromOrganization,
    updateMembership
}