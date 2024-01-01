import { Request } from 'express'
import subParameterDefinitionDao from './dao'
import periodTransactionService from '../../../process/period-transactions/service'
import processedTransactionService from '../../../process/payroll-process/service'
import employeeMasterService from '../../employee-master/service'
import transactionDefinitionService from '../../transaction-definition/service'

const create = async (req: Request, organizationId: string): Promise<string> => {
    const newMenu = req.body.data
    newMenu.organizationId = organizationId
    const newMenuId = await subParameterDefinitionDao.create({ ...newMenu })
    return newMenuId
}

const getAllFromOrganization = async (organizationId: any, parameterId: any): Promise<any[]> => await subParameterDefinitionDao.getAllFromOrganization(organizationId, parameterId)

const deleteMainParameterDefinition = async (userId: string): Promise<any> => await subParameterDefinitionDao.deleteMainParameterDefinition(userId)

const updateMainParameterDefinition = async (menuLevelData: any): Promise<any> => await subParameterDefinitionDao.updateMainParameterDefinition(menuLevelData)

const checkInEmployees = async (parameterId: any) => await employeeMasterService.parameterDefinitionExists(parameterId)

const checkInTransactionDefinition = async (parameterId: any) => await transactionDefinitionService.parameterDefinitionExists(parameterId)

const checkInPeriodTransactionos = async (transactionId: any) => await periodTransactionService.checkTransactionIdExists(transactionId)

const checkInProcessedTransactions = async (transactionId: any) => await processedTransactionService.checkTransactionIdExists(transactionId)

const checkIfMainParameterExists = async (parameterId: any) => await subParameterDefinitionDao.parameterIsParent(parameterId)

const checkIfParameterExistsInOtherTables = async (parameterId: any) => {
    const doesExistInEmployee = await checkInEmployees(parameterId)
    const doesExistInTransactionDefinition = await checkInTransactionDefinition(parameterId)
    console.log(doesExistInTransactionDefinition, doesExistInEmployee)
    if (doesExistInEmployee || doesExistInTransactionDefinition)
        return true
    return false
}

export default {
    create,
    deleteMainParameterDefinition,
    checkIfParameterExistsInOtherTables,
    checkIfMainParameterExists,
    checkInEmployees,
    checkInPeriodTransactionos,
    checkInProcessedTransactions,
    getAllFromOrganization,
    updateMainParameterDefinition
}