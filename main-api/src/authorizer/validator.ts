import { validateAll } from '../utils/validator'
import { check } from 'express-validator'
import userService from '../settings/user-management/users/service'
import authorizerDao from './dao'
// import branchService from './service'

const login = [
    check('email').custom(async (value: string) => {
        const doesExist = await userService.emailExists(value)
        if (!doesExist)
        	throw new Error(`Account with this email doesn't exist.`)
        return true
    }),
    check('password').custom(async (value: string, { req }: any) => {
        const { isMatch } = await authorizerDao.comparePassword(
            req.body?.email,
            req.body?.password
        )
        if (!isMatch)
            throw new Error(`Invalid Email or Password.`)
    }),
]


export const branchValidations = {
    login,
}

export default validateAll(branchValidations)
