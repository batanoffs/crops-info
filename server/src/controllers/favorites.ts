import { NextFunction, Request, Response } from 'express'
import Crop from '../models/Crop'
import Favorites from '../models/Favorites'
import { verifyToken } from '../services/jwt'
import mongoose from 'mongoose'

export const addToFavorites = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.body

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

		const favorites = await Favorites.findOne({ user: userId })

		if (!favorites) {
			const newFavorites = await Favorites.create({ user: userId, crops: [id] })
			await newFavorites.save()
			res.json(newFavorites)
		} else {
			if (favorites.crops.includes(id)) {
				res.status(400).json({ message: 'Crop already added to favorites' })
				return
			}

			favorites.crops.push(id)
			await favorites.save()
			res.json(favorites)
		}
	} catch (error: unknown) {
		console.error(error)

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

export const getFavorites = async (req: Request, res: Response): Promise<void> => {
	try {
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) {
			res.status(401).json({ message: 'No token provided' })
			return
		}

		const decodedToken = verifyToken(token)
		const userId = decodedToken._id

		if (!mongoose.Types.ObjectId.isValid(userId)) {
			res.status(400).json({ message: 'Invalid Object ID' })
			return
		}

		// Query Favorites
		const favorites = await Favorites.findOne({ user: userId })
			.populate({ path: 'crops', select: 'name picture' })
			.exec()

		if (!favorites) {
			res.status(204).json({ message: 'No content' })
			return
		}

		res.json(favorites)
	} catch (error: unknown) {
		console.error(error)
		if (error instanceof Error) {
			res.status(500).json({
				message: 'Error fetching favorites',
				error: error.message,
			})
		} else {
			res.status(501).json({
				message: 'Unknown error fetching favorites',
				error: 'Unknown error',
			})
		}
	}
}

export const removeFromFavorites = async (req: Request, res: Response): Promise<void> => {
	try {
		const { cropId } = req.params

		if (!cropId) {
			res.status(400).json({ message: 'Crop ID is required' })
			return
		}
		console.log(cropId)

		const token = req.headers.authorization?.split(' ')[1]

		if (!token) {
			res.status(401).json({ message: 'No token provided' })
			return
		}

		const decodedToken = verifyToken(token)
		const userId = decodedToken._id

		const favorites = await Favorites.findOne({ user: userId })
		if (!favorites) {
			res.status(404).json({ message: 'Favorites not found' })
			return
		}

		favorites.crops = favorites.crops.filter(id => id.toString() !== cropId)

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
