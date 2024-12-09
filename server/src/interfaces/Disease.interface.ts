import { Document, Types } from 'mongoose'

type Attributes = {
	identification: string
	prevention: string
	control: {
		ecoFriendly: string
		chemical: string
	}
}

export interface IDiseaseSchema extends Document {
	name: string
	picture: string
	attributes: Attributes
	plantsAffected: Types.ObjectId[]
	createdAt: Date
}
