import { validateAll } from '../../utils/validator'
import { check } from 'express-validator'
import transcationDefinitionSerice from '../../file/transaction-definition/service'

const editTransaction = [
    check('id').custom(async (value: string, { req }: any) => {
        const transactionData = req.body.data
        const isInPeriod = await transcationDefinitionSerice.checkInPeriodTransactionos(transactionData?.transactionId)
        const isProcessed = await transcationDefinitionSerice.checkInProcessedTransactions(transactionData?.transactionId)
        if (isProcessed || isInPeriod)
            throw new Error(`Transaction is used in process.`)
    }),
]


export const transactionDefinitionValidation = {
    editTransaction,
}

export default validateAll(transactionDefinitionValidation)
