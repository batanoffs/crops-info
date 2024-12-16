// Import dependencies
import { Request, Response, NextFunction } from 'express'
import Crop from '../models/Crop'

export const paginate = async (req: Request, res: Response, next: NextFunction) => {
	// Get query params
	const { page, limit } = req.query

	// Check if page and limit are provided in the request
	if (page && limit) {
		const currentPage = Number(page)
		const currentLimit = Number(limit)

		// Try to fetch data
		try {
			// Validate page query param
			if (isNaN(Number(page)) && Number(page) < 1)
				throw new Error('Page must be a positive number, greater or equal to 1!')

			// Validate limit query param
			if (isNaN(Number(limit)) && Number(limit) < 1)
				throw new Error('Limit must be a positive number, greater or equal to 1!')

			// Check total value and set default
			const total = await Crop.countDocuments()
			const totalPages = Math.ceil(total / currentLimit)

			// Define prev and next constants,
			const next =
				currentPage < totalPages
					? `http://localhost:4200/api/crops?page=${
							currentPage + 1
					  }&limit=${currentLimit}`
					: null
			const prev =
				currentPage > 1 && currentPage <= totalPages
					? `http://localhost:4200/api/crops?page=${
							currentPage - 1
					  }&limit=${currentLimit}`
					: null

			// Create pagination metadata
			const pagination = {
				totalPages,
				currentPage,
				next,
				prev,
			}

			res.locals.pagination = pagination
		} catch (error) {
			// Catch errors
			// Log the error and respond with an error message
			res.status(500).send({
				status: 'error',
				error: (error as Error).message,
			})
		}
	}

    // Move to next handler
	next()
}
