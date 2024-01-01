import { validateAll } from '../../utils/validator'
import { check } from 'express-validator'
import transcationDefinitionSerice from './service'

const deleteTransaction = [
    check('id').custom(async (value: string, { req }: any) => {
        const isInPeriod = await transcationDefinitionSerice.checkInPeriodTransactionos(value)
        const isProcessed = await transcationDefinitionSerice.checkInProcessedTransactions(value)
        if (isProcessed || isInPeriod)
            throw new Error(`Transaction is used in process.`)
    }),
]


export const transactionDefinitionValidation = {
    deleteTransaction,
}

export default validateAll(transactionDefinitionValidation)
