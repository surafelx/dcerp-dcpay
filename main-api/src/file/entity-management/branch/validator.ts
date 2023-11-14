import { validateAll } from '../../../utils/validator'
import { check } from 'express-validator'
import userService from '../../../settings/user-management/users/service'
import branchService from './service'

const newBranch = [
    check('branchCode').custom(async (value: string, { req }: any) => {
        const userId = req?.headers['x-user-id'];
        const branchData = req?.body?.data
        const userAuthInfo = await userService.getUserAuthorizationInfo(userId)
        const doesExist = await branchService.codeExists(branchData, userAuthInfo)
        if (doesExist)
        	throw new Error(`The site with id ${value} does not exist`)
        return true
    }),
]


export const branchValidations = {
    newBranch,
}

export default validateAll(branchValidations)
