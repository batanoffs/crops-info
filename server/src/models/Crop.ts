import { model, Schema } from 'mongoose'
import { ICropSchema } from '../interfaces/Crop.interface'

const CropSchema: Schema = new Schema({
	name: {
		type: String,
		required: [true, 'Title is required'],
		trim: true,
		minlength: 3,
	},
	picture: {
		type: String,
		trim: true,
		required: true,
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		trim: true,
		default: 'no description provided',
	},
	attributes: {
		spacing: {
			type: String,
			required: [true, 'Spacing is required, example 1/30cm'],
			trim: true,
		},
		plantingDepth: {
			type: String,
			required: [true, 'Planting depth is required'],
			trim: true,
		},
		sun: {
			type: String,
			required: [true, 'Sun is required'],
			enum: ['Full Sun', 'Partial Sun', 'Shade'],
			trim: true,
		},
		water: {
			type: String,
			required: [true, 'Water is req, example 2.5cm/week'],
			trim: true,
		},
		frost: {
			type: String,
			required: [true, 'Frost is required'],
			trim: true,
			enum: ['Not tolerant', 'Tolerant', 'Very tolerant'],
		},
		soil: {
			type: String,
			required: [true, 'Soil is required'],
			trim: true,
			enum: ['Acidic', 'Neutral', 'Alkaline'],
		},
		sproutToMature: {
			type: String,
			required: [true, 'Sprout to mature is example 40-50 days'],
			trim: true,
		},
		germination: {
			type: String,
			required: [true, 'Germination is example 7-12 days'],
			trim: true,
		},
		sowingTime: {
			type: String,
			required: [true, 'Sowing time is required'],
			trim: true,
		},
		color: {
			type: String,
			trim: true,
			required: true,
		},
		size: {
			type: String,
			trim: true,
			required: true,
		},
		growthTime: {
			type: String,
			trim: true,
			required: true,
		},
	},
	nutrition: {
		vitamins: {
			type: [String],
			trim: true,
			default: [],
		},
		nutrients: {
			type: [String],
			trim: true,
			default: [],
		},
		default: null,
	},
	pests: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Pests',
			default: null,
		},
	],
	diseases: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Diseases',
			default: null,
		},
	],
	companionPlants: [
		{
			plant: {
				type: Schema.Types.ObjectId,
				ref: 'Crops',
			},
			reasons: {
				type: [String],
				trim: true,
				default: [],
			},
		},
	],
	combativePlants: [
		{
			plant: {
				type: Schema.Types.ObjectId,
				ref: 'Crops',
			},
			reasons: {
				type: [String],
				trim: true,
				default: [],
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const Crop = model<ICropSchema>('Crop', CropSchema)

export default Crop
