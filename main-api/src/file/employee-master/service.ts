import { Request } from 'express'
import employeeDao from './dao'
import processedTransactionService from '../../process/payroll-process/service'
import payTransactionService from '../../tasks/pay-transaction/service'
import loanTransactionService from '../../tasks/loan-transaction/service'
import membershipService from '../../tasks/membership/service'
import transctionDefinitionService from '../transaction-definition/service'

const create = async (req: Request, organizationId: string, userInfo: any): Promise<string> => {
    const newEmployee = req.body.data
    newEmployee.organizationId = organizationId
    const newEmployeeId = await employeeDao.create({ ...newEmployee })
    const basicSalaryId = await transctionDefinitionService.getByNameAndOrganization(organizationId, 'Basic Salary')
    const daysWorkedId = await transctionDefinitionService.getByNameAndOrganization(organizationId, 'Days Worked')
    await payTransactionService.create({ employeeId: newEmployeeId.id, transactionId: basicSalaryId?.id, transactionAmount: newEmployee.basicSalary }, userInfo)
    await payTransactionService.create({ employeeId: newEmployeeId.id, transactionId: daysWorkedId?.id, transactionAmount: newEmployee.workingDays }, userInfo)
    return newEmployeeId
}

const getAllFromOrganization = async (organizationId: any, branchId: any, departmentId: any): Promise<any[]> => {
    const basicSalaryId = await transctionDefinitionService.getByNameAndOrganization(organizationId, 'Basic Salary')
    return await employeeDao.getAllFromOrganization(organizationId, basicSalaryId?.id, branchId, departmentId)
}

const getInfo = async (employeeId: any): Promise<any> => await employeeDao.getInfo(employeeId)

const deleteEmployee = async (employeeId: string, userInfo: any): Promise<any> => {
    await payTransactionService.deleteByEmployeeId(employeeId)
    await membershipService.deleteByEmployeeId(employeeId)
    await loanTransactionService.deleteByEmployeeId(employeeId)
    await employeeDao.deleteEmployee(employeeId)
}

const updateEmployee = async (employeeData: any): Promise<any> => await employeeDao.updateEmployee(employeeData)

const isProcessed = async (employeeId: any): Promise<any> => {
    const processedTransactions = await processedTransactionService.getAllByEmployee(employeeId)
    if (processedTransactions.length > 0)
        return true
    return false
}

const parameterDefinitionExists= async(parameterId: any) => await employeeDao.parameterDefinitionExists(parameterId)

export default {
    create,
    parameterDefinitionExists,
    deleteEmployee,
    isProcessed,
    getAllFromOrganization,
    getInfo,
    updateEmployee
}

