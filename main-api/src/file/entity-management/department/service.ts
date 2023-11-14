import {Request } from 'express'
import departmentDao from './dao'

const create = async (req: Request, organizationId: string): Promise<string> => {
    const newMenu = req.body.data
    newMenu.organizationId = organizationId
    const newMenuId = await departmentDao.create({ ...newMenu })
    return newMenuId
}

const codeExists = async (newDepartment: any, userAuthInfo: any): Promise<any> => {
    const { organization_id: organizationId } = userAuthInfo
    return await departmentDao.codeExists(newDepartment, organizationId)
}

const nameExists = async (newDepartment: any, userAuthInfo: any): Promise<any> => {
    const { organization_id: organizationId } = userAuthInfo
    return await departmentDao.nameExists(newDepartment, organizationId)
}

const getAllFromOrganization = async (organizationId: any, branchId: any): Promise<any[]> => await departmentDao.getAllFromOrganization(organizationId, branchId)

const deleteDepartment = async (userId: string): Promise<any> => await departmentDao.deleteDepartment(userId)

const updateDepartment = async (menuLevelData: any): Promise<any> => await departmentDao.updateDepartment(menuLevelData)


export default {
    create,
    codeExists,
    nameExists,
    deleteDepartment,
    getAllFromOrganization,
    updateDepartment
}