import { NextFunction, Request, Response } from 'express'
import Crop from '../models/Crop'
import { verifyToken } from '../services/jwt'

export const validateOwner = async (req: Request, res: Response): Promise<void> => {
	const { ownerId } = req.params

	try {
		if (!ownerId) {
			res.status(400).json({ message: 'No ownerId provided', isOwner: false })
			return
		}

		const token = req.headers.authorization?.split(' ')[1]

		if (!token) {
			res.status(401).json({ message: 'No token provided', isOwner: false })
			return
		}

		const decodedToken = verifyToken(token)
		const userId = decodedToken._id

		if (ownerId !== userId) {
			res.status(403).json({ message: 'Unauthorized', isOwner: false })
			return
		}

		res.status(200).json({ message: 'Authorized', isOwner: true })
	} catch (error) {
		res.status(500).json({ message: 'Error adding category item', isOwner: false, error })
	}
}

export const addCrop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	if (!req.body) {
		res.status(400).json({ message: 'No body provided' })
		return
	}

	const {
		name,
		picture,
		description,
		attributes,
		nutrition,
		pests,
		diseases,
		companionPlants,
		combativePlants,
	} = req.body

	if (!name || !picture || !description || !attributes) {
		res.status(400).json({ message: 'Missing required fields' })
		return
	}

	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		res.status(401).json({ message: 'No token provided' })
		return
	}

	const decodedToken = verifyToken(token)
	const userId = decodedToken._id

	const {
		spacing,
		plantingDepth,
		sun,
		water,
		frost,
		soil,
		sproutToHarvest,
		germination,
		sowingTime,
	} = attributes as {
		spacing: string
		plantingDepth: string
		sun: string
		water: string
		frost: string
		soil: string
		sproutToHarvest: string
		germination: string
		sowingTime: string
	}

	if (
		!spacing ||
		!plantingDepth ||
		!sun ||
		!water ||
		!frost ||
		!soil ||
		!sproutToHarvest ||
		!germination ||
		!sowingTime
	) {
		res.status(400).json({ message: 'Missing required fields in attributes' })
		return
	}

	try {
		const crop = await Crop.create({
			name,
			picture,
			description,
			attributes,
			nutrition,
			pests,
			diseases,
			companionPlants,
			combativePlants,
			createdBy: userId,
		})
		res.json(crop)
	} catch (error) {
		res.status(500).json({ message: 'Error adding category item', error })
	}
}

export const updateCrop = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params
	const { body } = req

	if (!body) {
		res.status(400).json({ message: 'No body provided' })
		return
	}

	try {
		const updatedCrop = await Crop.findByIdAndUpdate(id, body, { new: true })

		if (!updatedCrop) {
			res.status(404).json({ message: 'Crop not found' })
			return
		}

		res.json(updatedCrop)
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({
				message: 'Error updating crop',
				error: error?.message ?? 'Unknown error',
			})
		} else {
			res.status(500).json({
				message: 'Unknown error updating crop',
				error: 'Unknown error',
			})
		}
	}
}

export const getAll = async (req: Request, res: Response): Promise<void> => {
	try {
		// Fetch all Crops
		const crops = await Crop.find().lean().exec()
		if (!crops || crops.length === 0) {
			res.status(404).json({ message: 'No crops found' })
			return
		}
		res.json(crops)
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({ message: 'Error fetching crops', error: error.message })
		} else {
			res.status(500).json({
				message: 'Unknown error fetching crops',
				error: 'Unknown error',
			})
		}
	}
}

export const getOne = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params
	try {
		const crop = await Crop.findById(id)
			.populate({ path: 'pests', select: 'name picture' })
			.populate({ path: 'diseases', select: 'name picture' })
			.populate({ path: 'companionPlants.plant', select: 'name picture' })
			.populate({ path: 'combativePlants.plant', select: 'name picture' })
			.exec()
		if (!crop) {
			res.status(404).json({ message: 'Crop not found' })
			return
		}
		res.json(crop)
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({ message: 'Error fetching crop', error: error.message })
		} else {
			res.status(500).json({
				message: 'Unknown error fetching crop',
				error: 'Unknown error',
			})
		}
	}
}
