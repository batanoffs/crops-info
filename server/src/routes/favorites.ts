import { Router } from 'express'
import { addToFavorites, getFavorites, removeFromFavorites } from '../controllers/favorites'

const router = Router()

router.post('/', addToFavorites)
router.get('/', getFavorites)
router.delete('/:cropId', removeFromFavorites)

export default router
