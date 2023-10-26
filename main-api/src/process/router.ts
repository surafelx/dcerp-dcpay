import { Router } from 'express'
import payrollProcessRoute from './payroll-process/router'

const router = Router()

router.use('/payroll-process', payrollProcessRoute)

export default router