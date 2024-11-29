import { Document, Types } from 'mongoose'

export interface ICropsSchema extends Document {
	name: string
	description: string
	pesticides: Types.ObjectId[]
	picture: string
	createdAt: Date
}
