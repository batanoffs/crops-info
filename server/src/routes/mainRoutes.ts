const express = require('express')

import cropsRoutes from './crops'
import authRoutes from './auth'
import favoriteRoutes from './favorites'

const router = express.Router()

router.use('/crops', cropsRoutes)
router.use('/auth', authRoutes)
router.use('/favorites', favoriteRoutes)

export default router
