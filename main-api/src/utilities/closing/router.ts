import { Router } from 'express'

import monthClosingRoute from './month/router'

const router = Router()

router.use('/month', monthClosingRoute)

export default router