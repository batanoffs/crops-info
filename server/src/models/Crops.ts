import { model, Schema } from 'mongoose'
import { ICropsSchema } from '../interfaces/Crops.interface'

const CropsSchema: Schema = new Schema({
	name: {
		type: String,
		required: [true, 'Title is required'],
		trim: true,
		minlength: 3,
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		trim: true,
		default: 'липсва описание',
	},
	pesticides: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Pesticides',
			required: true,
		},
	],
	picture: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true,
	},
})

const Crops = model<ICropsSchema>('Crops', CropsSchema)

export default Crops
