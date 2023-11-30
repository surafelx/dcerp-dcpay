
import transactionDefinitionDao from './dao'
import periodTransactionService from '../../process/period-transactions/service'
import processedTransactionService from '../../process/payroll-process/service'

const create = async (newTransactionDefinition: any): Promise<string> => await transactionDefinitionDao.create({ ...newTransactionDefinition })

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await transactionDefinitionDao.getAllFromOrganization(organizationId)

const getByNameAndOrganization = async (organizationId: any, transactionName: any): Promise<any> => await transactionDefinitionDao.getByNameAndOrganization(organizationId, transactionName)

const deleteTransactionDefinition = async (userId: string): Promise<any> => await transactionDefinitionDao.deleteTransactionDefinition(userId)

const updateTransactionDefinition = async (transactionDefinition: any): Promise<any> => await transactionDefinitionDao.updateTransactionDefinition(transactionDefinition)

const getAllFromTransactionGroup = async (organizationId: any, main: any, transactionGroupId: any): Promise<any[]> => await transactionDefinitionDao.getAllFromTransactionGroup(organizationId, main, transactionGroupId)

const setupApp = async(organizationId: string, branchId: string) => await transactionDefinitionDao.setupApp(organizationId, branchId)

const getTransactionDefinitionByNameByOrganization = async (organizationId: any, transactionName: any): Promise<any[]> => await transactionDefinitionDao.getTransactionDefinitionByNameByOrganization(organizationId, transactionName)

const getInfo = async (transactionId: any) => await transactionDefinitionDao.getInfo(transactionId)

const checkInPeriodTransactionos = async (transactionId: any) => await periodTransactionService.checkTransactionIdExists(transactionId)

const checkInProcessedTransactions = async (transactionId: any) => await processedTransactionService.checkTransactionIdExists(transactionId)


const parameterDefinitionExists= async(parameterId: any) => await transactionDefinitionDao.parameterDefinitionExists(parameterId)


export default {
    create,
    checkInPeriodTransactionos,
    checkInProcessedTransactions,
    deleteTransactionDefinition,
    getAllFromOrganization,
    getAllFromTransactionGroup,
    getByNameAndOrganization,
    updateTransactionDefinition,
    parameterDefinitionExists,
    getTransactionDefinitionByNameByOrganization,
    getInfo,
    setupApp
}