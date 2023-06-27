
import periodDao from './dao'

// const setupPeriod = async (newPeriod: any): Promise<string> => await periodDao.setupPeriod(newPeriod)

const create = async (newPeriod: any,): Promise<string> => await periodDao.create({ ...newPeriod })

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await periodDao.getAllFromOrganization(organizationId)

const deletePeriod = async (userId: string): Promise<any> => await periodDao.deletePeriod(userId)

const updatePeriod = async (menuLevelData: any): Promise<any> => await periodDao.updatePeriod(menuLevelData)

const getCurrentPeriod = async (organizationId: any): Promise<any[]> => await periodDao.getCurrentPeriod(organizationId)

const generatePeriod = async(organizationId: any, currentPeriod: number): Promise<void> => await periodDao.generatePeriod(organizationId, currentPeriod)

const generateEthiopianPeriod = async(startingPeriod: any, currentPeriod: any, organizationId: any): Promise<void> => await periodDao.generateEthiopianPeriod(startingPeriod, currentPeriod, organizationId)


export default {
    create,
    deletePeriod,
    getAllFromOrganization,
    generatePeriod,
    getCurrentPeriod,
    generateEthiopianPeriod,
    updatePeriod,
    // setupPeriod
}