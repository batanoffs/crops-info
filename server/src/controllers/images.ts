import { imageService } from '../services/image'
import { Request, Response } from 'express'

export const uploadCoverImage = async (req: Request, res: Response) => {
	try {
		const result = await imageService.uploadImage(req)
		res.status(200).json({
			success: true,
			message: 'Uploaded!',
			data: result,
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({
			success: false,
			message: 'Error during upload',
		})
	}
}
