
import payrollSheetService from './dao'

const getAllFromOrganization = async (organizationId: any, branchId: any, departmentId: any, bankId: any, userInfo: any): Promise<any> => await payrollSheetService.getAllFromOrganization(organizationId, branchId, departmentId, bankId, userInfo)

export default {
    getAllFromOrganization,
}