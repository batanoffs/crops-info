import { model, Schema } from 'mongoose'
import { ICropCategorySchema } from '../interfaces/CropCategory.interface'

const CropCategorySchema: Schema = new Schema({
	name: {
		type: String,
		required: [true, 'Category name is required'],
		trim: true,
		minlength: 3,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true,
	},
})

const CropCategory = model<ICropCategorySchema>('CropCategory', CropCategorySchema)

export default CropCategory
