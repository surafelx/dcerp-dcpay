import {Request } from 'express'
import employeeDao from './dao'
import payTransactionService from '../../tasks/pay-transaction/service'
import transctionDefinitionService from '../transaction-definition/service'

const create = async (req: Request, organizationId: string, userInfo: any): Promise<string> => {
    const newEmployee = req.body.data
    newEmployee.organizationId = organizationId
    const newEmployeeId = await employeeDao.create({ ...newEmployee })
    const basicSalaryId = await transctionDefinitionService.getByNameAndOrganization(organizationId, 'Basic Salary')
    const calculatedSalary = (newEmployee.basicSalary*newEmployee.workingDays)/30
    await payTransactionService.create({employeeId: newEmployeeId.id, transactionId: basicSalaryId?.id, transactionAmount: calculatedSalary}, userInfo)
    return newEmployeeId
}

const getAllFromOrganization = async (organizationId: any, branchId: any, departmentId: any): Promise<any[]> => {
    const basicSalaryId = await transctionDefinitionService.getByNameAndOrganization(organizationId, 'Basic Salary')
    return await employeeDao.getAllFromOrganization(organizationId, basicSalaryId?.id, branchId, departmentId)
}

const getInfo = async (employeeId: any): Promise<any> => await employeeDao.getInfo(employeeId)

const deleteEmployee = async (userId: string): Promise<any> => {
    await employeeDao.deleteEmployee(userId)
}

const updateEmployee = async (employeeData: any): Promise<any> => await employeeDao.updateEmployee(employeeData)


export default {
    create,
    deleteEmployee,
    getAllFromOrganization,
    getInfo,
    updateEmployee
}