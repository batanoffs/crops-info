import { RequestHandler, Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const isUser = (): RequestHandler => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			res.redirect('/login')
		} else {
			next()
		}
	}
}

const isGuest = (): RequestHandler => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (req.user) {
			res.redirect('/')
		} else {
			next()
		}
	}
}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.token
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	try {
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
		const user = await User.findById(decoded._id)

		if (user) {
			next()
		} else {
			res.status(403).json({ message: 'Forbidden' })
		}
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized', error })
	}
}

export { isUser, isGuest, isAdmin }
