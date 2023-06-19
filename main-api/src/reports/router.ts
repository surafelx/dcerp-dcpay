import { Router } from 'express'
import payrollSHeetRoute from './payroll-sheet/router'
import payrollDisplayRoute from './payroll-display/router'
import payrollAdviceRoute from './payroll-advice/router'

const router = Router()

router.use('/payroll-sheet', payrollSHeetRoute)
router.use('/payroll-display', payrollDisplayRoute)
router.use('/payroll-advice', payrollAdviceRoute)



export default router