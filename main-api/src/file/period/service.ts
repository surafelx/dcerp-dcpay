
import periodDao from './dao'

const create = async (newPeriod: any,): Promise<string> => await periodDao.create({ ...newPeriod })

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await periodDao.getAllFromOrganization(organizationId)

const deletePeriod = async (userId: string): Promise<any> => await periodDao.deletePeriod(userId)

const updatePeriod = async (menuLevelData: any): Promise<any> => await periodDao.updatePeriod(menuLevelData)


export default {
    create,
    deletePeriod,
    getAllFromOrganization,
    updatePeriod
}