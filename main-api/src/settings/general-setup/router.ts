import { Router } from 'express'
import holidayRoute from './holiday/router'
import menuSetupRoute from './menu-setup/router'
import companyRoute from './company/router'

const router = Router()

router.use('/company-setup', companyRoute)
router.use('/holiday', holidayRoute)
router.use('/menu-setup', menuSetupRoute)

export default router