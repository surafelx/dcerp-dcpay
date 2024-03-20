import { Router } from 'express'

import transactionParameterCalculationRoute from './transaction-parameter-calculation/router'
import taxRateRoute from './tax-rate/router'
import closingRoute from './closing/router'
import backupRoute from './backup/router'



const router = Router()

router.use('/transaction-parameter-calculation', transactionParameterCalculationRoute)
router.use('/tax-rate', taxRateRoute)
router.use('/closing', closingRoute)
router.use('/backup', backupRoute)


export default router