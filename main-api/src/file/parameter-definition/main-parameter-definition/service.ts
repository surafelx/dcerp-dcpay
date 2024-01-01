import {Request} from 'express'
import mainParameterDefinitionDao from './dao'
import subParaameterDefinitionService from '../sub-parameter-definition/service'

const create = async (req: Request, organizationId: string): Promise<string> => {
    const newMenu = req.body.data
    newMenu.organizationId = organizationId
    const newMenuId = await mainParameterDefinitionDao.create({ ...newMenu })
    return newMenuId
}
const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await mainParameterDefinitionDao.getAllFromOrganization(organizationId)

const deleteMainParameterDefinition = async (userId: string): Promise<any> => await mainParameterDefinitionDao.deleteMainParameterDefinition(userId)

const updateMainParameterDefinition = async (menuLevelData: any): Promise<any> => await mainParameterDefinitionDao.updateMainParameterDefinition(menuLevelData)

const nameExists = async (newParameter: any, userAuthInfo: any): Promise<any> => {
    const { organization_id: organizationId } = userAuthInfo
    return await mainParameterDefinitionDao.nameExists(newParameter, organizationId)
}

const parameterIsParent = async(parameterId: any) => await subParaameterDefinitionService.checkIfMainParameterExists(parameterId)

export default {
    create,
    nameExists,
    parameterIsParent,
    deleteMainParameterDefinition,
    getAllFromOrganization,
    updateMainParameterDefinition
}