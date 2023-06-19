
import payrollSheetDao from './dao'

const getAllFromOrganization = async (organizationId: any, branchId: any, departmentId: any): Promise<any> => await payrollSheetDao.getAllFromOrganization(organizationId, branchId, departmentId)



export default {
    getAllFromOrganization,
}