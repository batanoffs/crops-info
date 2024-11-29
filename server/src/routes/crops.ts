import { Router } from 'express'

import { getAll, addVeggie } from '../controllers/crops'

const router = Router()

router.get('/', getAll)
router.post('/:id', addVeggie)

export default router
