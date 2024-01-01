import { validateAll } from '../../../utils/validator'
import { check } from 'express-validator'
import subParameterService from './service'


const deleteSubParameter = [
    check('id').custom(async (value: string) => {
        const doesExist = await subParameterService.checkIfParameterExistsInOtherTables(value)
        if (doesExist)
            throw new Error(`Parameter Name already exist.`)
    }),
]

export const mainParameterDefinitionValidation = {
    deleteSubParameter
}

export default validateAll(mainParameterDefinitionValidation)
