import { validateAll } from '../../utils/validator'
import { check } from 'express-validator'
import employeeService from './service'

const deleteEmployee = [
    check('id').custom(async (value: string, { req }: any) => {
        const isProcessed = await employeeService.isProcessed(value)
        if (isProcessed)
            throw new Error(`Employee is processed.`)
        return true
    }),
]


export const employeeValidations = {
    deleteEmployee,
}

export default validateAll(employeeValidations)
