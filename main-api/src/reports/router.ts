import { Router } from 'express'
import payrollSheetRoute from './payroll-sheet/router'
import payrollDisplayRoute from './payroll-display/router'
import payrollAdviceRoute from './payroll-advice/router'

const router = Router()

router.use('/payroll-sheet', payrollSheetRoute)
router.use('/payroll-display', payrollDisplayRoute)
router.use('/payroll-advice', payrollAdviceRoute)



export default router