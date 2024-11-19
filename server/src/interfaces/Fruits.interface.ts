import { Document, Types } from 'mongoose'

export interface IFruitsSchema extends Document {
	name: string
	description: string
	pesticides: Types.ObjectId[]
	picture: string
	createdAt: Date
}
