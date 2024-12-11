const { validationResult } = require('express-validator')

import { Request, Response } from 'express-serve-static-core'
import { createToken } from '../services/jwt'
import { loginUser, registerUser } from '../services/user'

const register = async (req: Request, res: Response) => {
	const { email, password, rePassword } = req.body

	try {
		const validation = validationResult(req)

		if (!validation.isEmpty()) {
			throw validation.errors
		}

		if (password !== rePassword) {
			throw { error: 'Passwords do not match' }
		}

		const user = await registerUser(email, password)
		const token = createToken(user)

		res.cookie('token', token, {
			httpOnly: true,
			secure: false,
			sameSite: 'none',
			maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
			path: '/', // restrict cookie to specific path
		})

		const redirectUrl = '/'
		return res
			.status(200)
			.json({ message: 'Registration successful', success: true, token, redirectUrl })
	} catch (error) {
		res.status(500).json({ message: 'Error during register', error, success: false })
	}
}

const login = async (req: Request, res: Response) => {
	const { email, password } = req.body

	try {
		const validation = validationResult(req)

		if (validation.errors.length) {
			throw validation.errors
		}

		const user = await loginUser(email, password)
		const token = createToken(user)

		res.cookie('token', token, {
			httpOnly: true,
			secure: false, //process.env.NODE_ENV === 'production',
			sameSite: 'none',
			maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
			path: '/', // restrict cookie to specific path
		})

		const redirectUrl = '/'

		res.status(200).json({ message: 'Login successful', token, redirectUrl, success: true })
	} catch (error) {
		res.status(500).json({ message: 'Error during login', error, success: false })
	}
}

const logout = (req: Request, res: Response) => {
	const redirectUrl = '/'

	res.clearCookie('token', {
		httpOnly: true,
		secure: false, //process.env.NODE_ENV === 'production',
		sameSite: 'none',
		path: '/', // restrict cookie to specific path
	})

	res.status(200).json({ message: 'Logout successful', redirectUrl })
}

export { register, login, logout }
