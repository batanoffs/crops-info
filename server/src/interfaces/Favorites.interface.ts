export interface IFavoritesSchema extends Document {
	user: string
	crops: string[]
}
