import { IUserSchema } from '../interfaces/user.interface'
import User from '../models/User'
import bcrypt from 'bcryptjs'

async function registerUser(identity: string, password: string): Promise<IUserSchema> {
	try {
		const existingUser = await User.findOne({ [process.env.IDENTITY as string]: identity })
		if (existingUser) {
			throw new Error(`This email is already in use`)
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const newUser = new User({
			[process.env.IDENTITY as string]: identity,
			password: hashedPassword,
		})

		const savedUser = await newUser.save()
		return savedUser
	} catch (error: any) {
		console.error('Failed to register user:', error)
		if (error.code === 11000) {
			throw new Error(`This email is already in use`)
		} else {
			throw new Error(`Exceptional error occurred: ${error.message}`)
		}
	}
}

async function loginUser(identity: string, password: string): Promise<IUserSchema> {
	const user = await User.findOne({ [process.env.IDENTITY as string]: identity })

	if (!user) {
		throw new Error(`Incorrect ${process.env.IDENTITY} or password`)
	}

	const match = await bcrypt.compare(password, user.password)

	if (!match) {
		throw new Error(`Incorrect ${process.env.IDENTITY} or password`)
	}

	return user
}

export { registerUser, loginUser }
