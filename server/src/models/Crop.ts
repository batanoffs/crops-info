import { model, Schema } from 'mongoose'
import { ICropSchema } from '../interfaces/Crop.interface'

const CropSchema: Schema = new Schema(
	{
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
				type: Number,
				required: [true, 'Planting depth is required in centimeters'],
			},
			sun: {
				type: String,
				required: [true, 'Sun is required, example Full Sun'],
				enum: ['Full Sun', 'Partial Sun', 'Shade'],
				trim: true,
			},
			water: {
				type: Number,
				required: [true, 'Water is required, e.g., 2.5'],
			},
			frost: {
				type: String,
				enum: ['Not tolerant', 'Tolerant', 'Very tolerant'],
				required: [true, 'Frost is required'],
				trim: true,
			},
			soil: {
				type: String,
				required: [true, 'Soil is required'],
				trim: true,
				enum: ['Acidic', 'Neutral', 'Alkaline'],
			},
			sproutToHarvest: {
				type: String,
				required: [
					true,
					'Sprout to harvest example 40-50 or 34 as exact number. Measured in days',
				],
				trim: true,
			},
			germination: {
				type: String,
				required: [true, 'Germination example 7-12 days or 2-3 weeks.'],
				trim: true,
			},
			sowingTime: {
				type: String,
				required: [true, 'Sowing time is required. Example Early Summer or Late Winter'],
				trim: true,
				enum: [
					'Very Early Spring',
					'Early Spring',
					'Spring',
					'Late Spring',
					'Very Early Summer',
					'Early Summer',
					'Summer',
					'Late Summer',
					'Very Early Autumn',
					'Early Autumn',
					'Autumn',
					'Late Autumn',
					'Very Early Winter',
					'Early Winter',
					'Winter',
					'Late Winter',
				],
			},
		},
		nutrition: {
			vitamins: [
				{
					type: String,
					trim: true,
				},
			],
			nutrients: [
				{
					type: String,
					trim: true,
				},
			],
			_id: false,
		},
		pests: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Pest',
				default: null,
				_id: false,
			},
		],
		diseases: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Disease',
				default: null,
				_id: false,
			},
		],
		companionPlants: [
			{
				plant: {
					type: Schema.Types.ObjectId,
					ref: 'Crop',
				},
				reasons: [
					{
						type: String,
						trim: true,
					},
				],
				_id: false,
			},
		],
		combativePlants: [
			{
				plant: {
					type: Schema.Types.ObjectId,
					ref: 'Crop',
				},
				reasons: {
					type: String,
					trim: true,
				},
				_id: false,
			},
		],
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		createdAt: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
	{
		timestamps: true,
		versionKey: false,
		unique: true,
	}
)

const Crop = model<ICropSchema>('Crop', CropSchema)

export default Crop
