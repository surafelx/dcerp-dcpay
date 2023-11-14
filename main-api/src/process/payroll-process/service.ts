
import payrollProcessDao from './dao'

const getAllFromOrganization = async (organizationId: any, branchId: any, departmentId: any, userInfo: any): Promise<any> => await payrollProcessDao.getAllFromOrganization(organizationId, branchId, departmentId, userInfo)

export default {
    getAllFromOrganization,
}