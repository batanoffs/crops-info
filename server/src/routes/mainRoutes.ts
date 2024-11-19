const express = require('express')

import vegetablesRoutes from './vegetables'

const router = express.Router()

router.use('/vegetables', vegetablesRoutes)

export default router
