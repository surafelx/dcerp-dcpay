import companyDao from './dao'
import branchDao from '../../../file/entity-management/branch/dao'
import periodService from '../../../file/period/service'
import roleService from '../../../settings/user-management/roles/service'
import userService from '../../../settings/user-management/users/service'
import roleBranchService from '../../../settings/rights-management/branch/service'

const create = async (newHoliday: any): Promise<string> => await companyDao.create(newHoliday)

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await companyDao.getAllFromOrganization(organizationId)

const getInfo = async (holidayId: any): Promise<any> => await companyDao.getInfo(holidayId)

const deleteHoliday = async (holidayId: string): Promise<any> => await companyDao.deleteHoliday(holidayId)

const updateHoliday = async (holidayData: any): Promise<any> => await companyDao.updateHoliday(holidayData)

const defaultUser = {
    firstName: 'Abebe',
    lastName: 'Balcha',
    email: 'abebebalcha@gmail.com',
    password: 'Lol!pop3208'
}


// const defaultParameters = {
//     mainParameters: [],
//     subParameters: [],
//     transactionDefinitions: [],
// }

// const defaultUtilities = {
//     mainParameters: [],
//     subParameters: [],
//     transactionDefinitions: [],
// }


const setupApp =  async (companyData: any): Promise<any> => {
    try {
        const {
            company,
            // period,
            userRole,
            userAccount,
            // parameters,
            // utilities
        } = companyData
        const { branchCode, branchName, name: companyName } = company
        const organizationId = await companyDao.create(company)
        const newBranch = { branchCode, branchName, organizationId }
        const { id: branchId } = await branchDao.create(newBranch)
        const startingPeriod = '2015,11,1';

        await periodService.generateEthiopianPeriod(startingPeriod, 12, organizationId)

        const newRole = userRole.default ? { roleName: 'Admin' } : { roleName: userRole.custom.roleName }
        const newUser = userAccount.default ? defaultUser : userAccount.custom

        // // const newParameters = parameters.default ? defaultParameters : parameters.custom
        // // const newUtilities = utilities.default ? defaultUtilities : utilities.custom

        newUser.email = `admin@${companyName.replace(' ', '').toLowerCase()}.com`
        const roleId = await roleService.createByOrganizationId(newRole, organizationId, branchId)
        await roleBranchService.populateForBranch(organizationId, roleId)
        newUser.roleId = roleId
        await userService.setupApp(newUser, organizationId)
    } catch (e) {
        console.log(e)
    }

}
export default {
    create,
    getAllFromOrganization,
    getInfo,
    deleteHoliday,
    setupApp,
    updateHoliday

}