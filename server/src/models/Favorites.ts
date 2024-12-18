import { model, Schema } from 'mongoose'
import { IFavoritesSchema } from '../interfaces/Favorites.interface'

const FavoritesSchema: Schema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},
		crops: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Crop',
				required: true,
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
		_id: false,
	}
)

const Favorites = model<IFavoritesSchema>('Favorites', FavoritesSchema)

export default Favorites
