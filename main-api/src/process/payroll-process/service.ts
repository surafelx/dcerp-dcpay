
import payrollProcessDao from './dao'

const getAllFromOrganization = async (organizationId: any, branchId: any, departmentId: any, userInfo: any): Promise<any> => await payrollProcessDao.getAllFromOrganization(organizationId, branchId, departmentId, userInfo)

const getAllByEmployee = async (employeeId: any): Promise<any[]> => await payrollProcessDao.getAllByEmployee(employeeId)

const checkTransactionIdExists = async (transactionId: any): Promise<any> => await payrollProcessDao.checkTransactionIdExists(transactionId)


export default {
    getAllFromOrganization,
    getAllByEmployee,
    checkTransactionIdExists
}