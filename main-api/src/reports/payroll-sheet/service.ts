
import payrollSheetService from './dao'

const getAllFromOrganization = async (organizationId: any, branchId: any, departmentId: any, bankId: any, userInfo: any, report: any): Promise<any> => await payrollSheetService.getAllFromOrganization(organizationId, branchId, departmentId, bankId, userInfo, report)

export default {
    getAllFromOrganization,
}