import express, { Express } from 'express'
import { session } from '../middlewares/session'
import { corsConfig } from '../middlewares/cors'

var cookieParser = require('cookie-parser')

const cookieOptions = {
	secure: true, // allows cookies to be sent over HTTPS
	httpOnly: true, // prevents JavaScript from accessing cookies
	sameSite: 'None', // allows cookies to be sent in cross-site requests
}

function configExpress(app: Express): void {
	const { corsMiddleware, customMiddleware } = corsConfig()

	app.use(cookieParser(process.env.JWT_SECRET, cookieOptions))
	app.disable('x-powered-by')
	app.disable('x-render-origin-server')
	app.use(corsMiddleware) // Apply CORS middleware
	app.use(customMiddleware) // Apply custom header middleware
	app.use(session())
	app.use(express.json())
}

export { configExpress }
