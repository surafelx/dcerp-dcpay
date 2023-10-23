
import payrollDisplayDao from './dao'

const getAllFromOrganization = async (organizationId: any, employeeId: any, userInfo: any): Promise<any> => await payrollDisplayDao.getAllFromOrganization(organizationId, employeeId, userInfo)

export default {
    getAllFromOrganization,
}