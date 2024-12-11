import { model, Schema, Document } from 'mongoose'
import { IFavoritesSchema } from '../interfaces/Favorites.interface'

const FavoritesSchema: Schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	crops: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Crop',
			required: true,
		},
	],
})

const Favorites = model<IFavoritesSchema>('Favorites', FavoritesSchema)

export default Favorites
