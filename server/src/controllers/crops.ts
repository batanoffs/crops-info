import { NextFunction, Request, Response } from 'express'
import Crops from '../models/Crops'
/**
 * Adds a new category item to the database.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const addVeggie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const {
		body: { name },
	} = req

	try {
	} catch (error) {
		res.status(500).json({ message: 'Error adding category item', error })
	}
}

export const getAll = async (req: Request, res: Response) => {
	try {
		// Fetch all Crops
		const crops = await Crops.find().lean().exec()
		res.json(crops)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching categories', error })
	}
}
