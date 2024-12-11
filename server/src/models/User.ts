import { model, Schema } from 'mongoose'
import { IUserSchema } from '../interfaces/user.interface'

const UserSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		register_date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		collation: {
			locale: 'en',
			strength: 2,
		},
	}
)

const User = model<IUserSchema>('User', UserSchema)

export default User
