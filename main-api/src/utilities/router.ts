import { Router } from 'express'

import transactionParameterCalculationRoute from './transaction-parameter-calculation/router'
import taxRateRoute from './tax-rate/router'
import closingRoute from './closing/router'



const router = Router()

router.use('/transaction-parameter-calculation', transactionParameterCalculationRoute)
router.use('/tax-rate', taxRateRoute)
router.use('/closing', closingRoute)


export default router