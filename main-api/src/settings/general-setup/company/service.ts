import companyDao from './dao'
import branchDao from '../../../file/entity-management/branch/dao'
import periodService from '../../../file/period/service'
import roleService from '../../../settings/user-management/roles/service'
import userService from '../../../settings/user-management/users/service'
import roleBranchService from '../../../settings/rights-management/branch/service'
import parameterService from '../../../file/parameter-definition/service'
import transactionDefinitionService from '../../../file/transaction-definition/service'
import transactionParameterCalculationService from '../../../utilities/transaction-parameter-calculation/service'
import menuItemsService from '../../general-setup/menu-setup/service'
import taxRateService from '../../../utilities/tax-rate/service'

const create = async (newHoliday: any): Promise<string> => await companyDao.create(newHoliday)

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await companyDao.getAllFromOrganization(organizationId)

const getInfo = async (holidayId: any): Promise<any> => await companyDao.getInfo(holidayId)

const deleteHoliday = async (holidayId: string): Promise<any> => await companyDao.deleteHoliday(holidayId)

const updateHoliday = async (holidayData: any): Promise<any> => await companyDao.updateHoliday(holidayData)

const setupApp =  async (companyData: any): Promise<any> => {
    try {
        const {
            company,
            period,
            userRole,
            user,
            parameters,
            // utilities
        } = companyData
        const { branchCode, branchName } = company
        const organizationId = await companyDao.create(company)

        const newBranch = { branchCode, branchName, organizationId }
        const { id: branchId } = await branchDao.create(newBranch)
        
        const startingPeriod = '2015,11,1';

        const {calendar, currentPeriod } = period

        if(calendar === 'ethiopian-calendar')
            await periodService.generateEthiopianPeriod(startingPeriod, currentPeriod, organizationId)

        if(calendar === 'gregorian-calendar')
            await periodService.generateGregorianPeriod(currentPeriod, organizationId)

        const newRole = userRole.default ? { roleName: 'Admin' } : { roleName: userRole.custom.roleName }
        const newUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            roleId: ''
        }

        if(parameters.default) {
            await parameterService.setupApp(organizationId)
            await transactionDefinitionService.setupApp(organizationId, branchId)
            await transactionParameterCalculationService.setupApp(organizationId)
        }

        await taxRateService.setupApp(organizationId)

        await menuItemsService.setupApp(organizationId)
        
        // // const newParameters = parameters.default ? defaultParameters : parameters.custom
        // // const newUtilities = utilities.default ? defaultUtilities : utilities.custom

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