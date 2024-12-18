import { Crop } from './crop.interface';

export interface Favorites {
	_id: string;
	user: string;
	crops: Crop[];
}
