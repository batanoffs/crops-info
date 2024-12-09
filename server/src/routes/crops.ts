import { Router } from 'express'

import { getAll, addCrop } from '../controllers/crops'

const router = Router()

router.get('/', getAll)
router.post('/:id', addCrop)

export default router
