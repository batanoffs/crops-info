import { model, Schema } from 'mongoose'
import { IPestSchema } from '../interfaces/Pest.interface'

const PestSchema: Schema = new Schema({
	name: {
		type: String,
		required: [true, 'Pest name is required'],
		trim: true,
		minlength: 3,
	},
	picture: {
		type: String,
		required: true,
	},
	attributes: {
		identification: {
			type: String,
			required: [true, 'Identification is required'],
			trim: true,
		},
		damage: {
			type: String,
			required: [true, 'Damage is required'],
			trim: true,
		},
		prevention: {
			type: String,
			required: [true, 'Prevention is required'],
			trim: true,
		},
		control: {
			ecoFriendly: {
				type: String,
				required: [true, 'Eco-friendly is required'],
				trim: true,
			},
			chemical: {
				type: String,
				required: [true, 'Chemical is required'],
				trim: true,
			},
		},
	},
	plantsAffected: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Crops',
			required: true,
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
		required: true,
	},
})

const Pest = model<IPestSchema>('Pest', PestSchema)

export default Pest
