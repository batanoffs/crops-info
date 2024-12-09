import { Document, Types } from 'mongoose'

export interface ICropCategorySchema extends Document {
	name: string
	createdAt: Date
}
