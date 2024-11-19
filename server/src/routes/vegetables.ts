import { Router } from 'express'

import { getAll, addVeggie } from '../controllers/vegetables'

const router = Router()

router.get('/', getAll)
router.post('/:id', addVeggie)

export default router
