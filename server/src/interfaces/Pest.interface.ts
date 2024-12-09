import { Document, Types } from 'mongoose'

interface Control {
	ecoFriendly: string
	chemical: string
}

interface Attributes {
	identification: string
	damage: string
	prevention: string
	control: Control
}

export interface IPestSchema extends Document {
	name: string
	picture: string
	attributes: Attributes
	plantsAffected: Types.ObjectId[]
	createdAt: Date
}
