import { JwtPayload, SignOptions, verify, sign } from 'jsonwebtoken'

function createToken(userData: { email: string; _id?: string }): string {
	const payload: JwtPayload = {
		email: userData.email,
		_id: userData._id,
	}

	const token = sign(payload, process.env.JWT_SECRET!, {
		expiresIn: process.env.TOKEN_EXPIRATION,
	} as SignOptions)

	return token
}

function verifyToken(token: string): JwtPayload {
	const data = verify(token, process.env.JWT_SECRET!) as JwtPayload

	return data
}

export { createToken, verifyToken }
