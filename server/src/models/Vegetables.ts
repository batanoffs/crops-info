import { model, Schema } from 'mongoose'
import { IVegetablesSchema } from '../interfaces/Vegetables.interface'

const VegetablesSchema: Schema = new Schema({
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

const Vegetables = model<IVegetablesSchema>('Vegetables', VegetablesSchema)

export default Vegetables
