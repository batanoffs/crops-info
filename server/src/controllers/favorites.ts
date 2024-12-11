import { NextFunction, Request, Response } from 'express'
import Crop from '../models/Crop'
import Favorites from '../models/Favorites'
import { verifyToken } from '../services/jwt'

export const addToFavorites = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params

	try {
		//TODO validate and get userID from provided token
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) {
			res.status(401).json({ message: 'No token provided' })
			return
		}

		const decodedToken = verifyToken(token)
		const userId = decodedToken._id
		
		const crop = await Crop.findById(id)
		if (!crop) {
			res.status(404).json({ message: 'Crop not found' })
			return
		}

		const favorites = await Favorites.create({ user: userId, crops: [id] })
		await favorites.save()
		res.json(favorites)
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({
				message: 'Error adding crop to favorites',
				error: error.message,
			})
		} else {
			res.status(500).json({
				message: 'Unknown error adding crop to favorites',
				error: 'Unknown error',
			})
		}
	}
}

export const removeFromFavorites = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params
	const { userId } = req.body

	try {
		const crop = await Crop.findById(id)
		if (!crop) {
			res.status(404).json({ message: 'Crop not found' })
			return
		}

		const favorites = await Favorites.findOne({ user: userId })
		if (!favorites) {
			res.status(404).json({ message: 'Favorites not found' })
			return
		}

		favorites.crops = favorites.crops.filter(cropId => (cropId as string) !== id)
		await favorites.save()
		res.json(favorites)
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({
				message: 'Error removing crop from favorites',
				error: error.message,
			})
		} else {
			res.status(500).json({
				message: 'Unknown error removing crop from favorites',
				error: 'Unknown error',
			})
		}
	}
}
