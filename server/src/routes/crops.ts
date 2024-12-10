import { Router } from 'express'

import { getAll, addCrop, getOne } from '../controllers/crops'

const router = Router()

router.get('/', getAll)
router.post('/:id', addCrop)
router.get('/:id', getOne)

export default router
