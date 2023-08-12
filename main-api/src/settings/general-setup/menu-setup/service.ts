import menuSetupDao from './dao'

export const getAllFromOrganizations = async (organizationId: string) => await menuSetupDao.getAllFromOrganizations(organizationId)

export const setupApp = async (organizationId: string) => await menuSetupDao.setupApp(organizationId)

export default {
    getAllFromOrganizations,
    setupApp
}