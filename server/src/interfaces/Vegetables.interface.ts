import { Document, Types } from 'mongoose'

export interface IVegetablesSchema extends Document {
	name: string
	description: string
	pesticides: Types.ObjectId[]
	picture: string
	createdAt: Date
}
