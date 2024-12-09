import { Document, Types } from 'mongoose'

type Attributes = {
	spacing: string
	plantingDepth: string
	sun: 'Full Sun' | 'Partial Sun' | 'Shade'
	water: string
	frost: 'Not tolerant' | 'Tolerant' | 'Very tolerant'
	soil: 'Acidic' | 'Neutral' | 'Alkaline'
	sproutToMature: string
	germination: string
	sowingTime: string
	color: string
	size: string
	growthTime: string
}

type Nutrition = {
	vitamins: string[]
	nutrients: string[]
}

type CompanionPlants = {
	plant: Types.ObjectId
	reasons: string[]
}

type CombatPlants = {
	plant: Types.ObjectId
	reasons: string[]
}

export interface ICropSchema extends Document {
	name: string
	picture: string
	description: string
	attributes: Attributes
	nutrition: Nutrition
	pests: Types.ObjectId[]
	diseases: Types.ObjectId[]
	companionPlants: CompanionPlants[]
	combativePlants: CombatPlants[]
	createdAt: Date
}
