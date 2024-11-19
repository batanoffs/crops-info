import { Document, Types } from 'mongoose'

export interface IPesticidesSchema extends Document {
	name: string
	description: string
	picture: string
	createdAt: Date
}
