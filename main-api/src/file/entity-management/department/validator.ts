import { validateAll } from '../../../utils/validator'
import { check } from 'express-validator'
import userService from '../../../settings/user-management/users/service'
import departmentSerivce from './service'

const newDepartment = [
    check('departmentCode').custom(async (value: string, { req }: any) => {
        const userId = req?.headers['x-user-id'];
        const departmentData = req?.body?.data
        const userAuthInfo = await userService.getUserAuthorizationInfo(userId)
        const doesExist = await departmentSerivce.codeExists(departmentData, userAuthInfo)
        if (doesExist)
        	throw new Error(`Department Code exists for Branch.`)
        return true
    }),
    check('departmentName').custom(async (value: string, { req }: any) => {
        const userId = req?.headers['x-user-id'];
        const departmentData = req?.body?.data
        const userAuthInfo = await userService.getUserAuthorizationInfo(userId)
        const doesExist = await departmentSerivce.nameExists(departmentData, userAuthInfo)
        if (doesExist)
        	throw new Error(`Department Name exists for Branch.`)
        return true
    }),
]


export const departmentValidations = {
    newDepartment,
}

export default validateAll(departmentValidations)
