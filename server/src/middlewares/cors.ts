import cors from 'cors'
import { Request, Response, NextFunction } from 'express'

// Custom CORS configuration function
function corsConfig() {
	const getOrigin = (
		requestOrigin: string | undefined,
		callback: (err: Error | null, origin?: string | boolean) => void
	) => {
		const allowedOrigins = process.env.ALLOWED_ADDRESS!.split(',')
		if (!requestOrigin || allowedOrigins.includes(requestOrigin.trim())) {
			callback(null, requestOrigin)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
	const corsOptions = {
		origin: getOrigin,
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'],
		exposedHeaders: ['X-Total-Count'],
		optionsSuccessStatus: 200, // For legacy browser support
	}

	// CORS middleware
	const corsMiddleware = cors(corsOptions)

	// Custom middleware for handling headers
	const customMiddleware = function (req: Request, res: Response, next: NextFunction): void {
		if (req.method === 'OPTIONS') {
			res.sendStatus(204)
			return
		}

		next()
	}

	return { corsMiddleware, customMiddleware }
}

export { corsConfig }
