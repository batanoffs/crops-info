// @ts-nocheck

import multer, { StorageEngine } from 'multer'
import { Request } from 'express'

interface MulterFile extends Express.Multer.File {
	originalname: string
}

const storage: StorageEngine = multer.diskStorage({
	filename: (
		req: Request,
		file: MulterFile,
		cb: (error: Error | null, filename: string) => void
	) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

export default upload
