import { Router } from 'express'
import { uploadCoverImage } from '../controllers/images'
import { getAll, addCrop, getOne } from '../controllers/crops'
import upload from '../middlewares/multer'

const router = Router()

router.get('/', getAll)
router.post('/:id', addCrop)
router.get('/:id', getOne)
router.post('/upload', upload.single('picture'), uploadCoverImage)

export default router
