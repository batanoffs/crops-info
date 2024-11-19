import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../services/jwt'

declare global {
	namespace Express {
		interface Request {
			user?: {
				email: string
				id: string
			}
		}
	}
}

function session(): (req: Request, res: Response, next: NextFunction) => void {
	return function (req: Request, res: Response, next: NextFunction) {
		const token = req.cookies?.token

		if (token) {
			try {
				const sessionData = verifyToken(token)

				console.info('Session data for the user:', sessionData)

				req.user = {
					email: sessionData.email,
					id: sessionData._id,
				}
				res.locals.hasUser = true
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.error('Error during session verification:', error.message)
					res.clearCookie('token')
				} else {
					console.error('Unknown error during session verification:', error)
					res.clearCookie('token')
				}
			}
		}

		next()
	}
}

export { session }
