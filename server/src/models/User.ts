import { model, Schema } from 'mongoose'
import { IUserSchema } from '../interfaces/User.interface'

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
		timestamps: true,
		versionKey: false,
		unique: true,
	}
)

const User = model<IUserSchema>('User', UserSchema)

export default User
