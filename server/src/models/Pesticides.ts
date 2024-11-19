import { model, Schema } from 'mongoose'
import { IPesticidesSchema } from '../interfaces/Pesticides.interface'

const PesticidesSchema: Schema = new Schema({
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

const Pesticides = model<IPesticidesSchema>('Book', PesticidesSchema)

export default Pesticides
