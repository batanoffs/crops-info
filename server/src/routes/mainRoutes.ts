const express = require('express')

import cropsRoutes from './crops'
import authRoutes from './auth'

const router = express.Router()

router.use('/crops', cropsRoutes)
router.use('/auth', authRoutes)

export default router
