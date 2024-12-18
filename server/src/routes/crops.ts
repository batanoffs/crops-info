import { Router } from 'express'
import { uploadCoverImage } from '../controllers/images'
import { getAll, addCrop, getOne, updateCrop, validateOwner } from '../controllers/crops'
import upload from '../middlewares/multer'

const router = Router()

router.get('/', getAll)
router.post('/', addCrop)
router.get('/:id', getOne)
router.put('/:id', updateCrop)
router.get('/owner/:ownerId', validateOwner)
router.post('/upload', upload.single('file'), uploadCoverImage)

export default router
