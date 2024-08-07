import {Request } from 'express'
import branchDao from './dao'
import roleBranchService from '../../../settings/rights-management/branch/service'


const create = async (req: Request, userAuthInfo: any): Promise<string> => {
    const { organization_id: organizationId } = userAuthInfo
    const newMenu = req.body.data
    newMenu.organizationId = organizationId
    const branch = await branchDao.create({ ...newMenu })
    await roleBranchService.populateForRole(organizationId, branch.id)
    return branch
}

const getAllFromOrganization = async (userAuthInfo: any): Promise<any[]> => {
    const { organization_id: organizationId } = userAuthInfo
    return await branchDao.getAllFromOrganization(organizationId)
}

const codeExists = async (newBranch: any, userAuthInfo: any): Promise<any> => {
    const { organization_id: organizationId } = userAuthInfo
    return await branchDao.codeExists(newBranch.branchCode, organizationId)
}

const getAllFromOrganizations = async (organizationId: any): Promise<any[]> => await branchDao.getAllFromOrganization(organizationId)


const deleteBranch = async (branchId: string): Promise<any> => {
    await roleBranchService.deleteForBranch(branchId)
    return await branchDao.deleteBranch(branchId)
}


const updateBranch = async (menuLevelData: any): Promise<any> => await branchDao.updateBranch(menuLevelData)


export default {
    create,
    codeExists,
    deleteBranch,
    getAllFromOrganization,
    getAllFromOrganizations,
    updateBranch
}