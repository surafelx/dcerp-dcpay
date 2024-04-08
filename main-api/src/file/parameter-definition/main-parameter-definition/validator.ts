import { validateAll } from '../../../utils/validator'
import { check } from 'express-validator'
import userService from '../../../settings/user-management/users/service'
import mainParameterService from './service'

const newMainParameter = [
    check('parameterName').custom(async (value: string, { req }: any) => {
        const userId = req?.headers['x-user-id'];
        const parameterData = req?.body?.data
        const userAuthInfo = await userService.getUserAuthorizationInfo(userId)
        const doesExist = await mainParameterService.nameExists(parameterData, userAuthInfo)
        if (doesExist)
        	throw new Error(`Parameter Name already exist.`)
    }),
]

const deleteMainParameter = [
    check('id').custom(async (value: string) => {
        const doesExist = await mainParameterService.parameterIsParent(value)
        if (doesExist)
        	throw new Error(`Parameter Name already exist.`)
    }),
]

export const mainParameterDefinitionValidation = {
    newMainParameter,
    deleteMainParameter
}

export default validateAll(mainParameterDefinitionValidation)
