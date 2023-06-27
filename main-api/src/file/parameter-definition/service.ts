
import parameterDefinitionDao from './dao'

const getSubParameterIdByName = async (parentParameterName: any, parameterName: any): Promise<any[]> => await parameterDefinitionDao.getSubParameterIdByName(parentParameterName, parameterName)

const getSubParameterIdByNameByOrganization = async (organizationId: any, parentParameterName: any, parameterName: any): Promise<any[]> => await parameterDefinitionDao.getSubParameterIdByNameByOrganization(organizationId, parentParameterName, parameterName)

const setupApp = async(organizationId: string) => await parameterDefinitionDao.setupApp(organizationId)

export default {
    getSubParameterIdByName,
    getSubParameterIdByNameByOrganization,
    setupApp
}