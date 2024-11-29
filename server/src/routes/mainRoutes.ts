const express = require('express')

import cropsRoutes from './crops'

const router = express.Router()

router.use('/crops', cropsRoutes)

export default router
