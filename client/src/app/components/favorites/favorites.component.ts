import { Component } from '@angular/core';
import { FavoritesService } from './favorites.service';
import { Crop } from '../../types/crop.interface';
import { CropList } from '../catalog/crop-list/crop-list.component';
import { Favorites } from '../../types/favorites.interface';

@Component({
	selector: 'app-favorites',
	standalone: true,
	imports: [CropList],
	templateUrl: './favorites.component.html',
	styleUrl: './favorites.component.scss',
	providers: [FavoritesService],
})
export class FavoritesComponent {
	favoriteCrops: Crop[] = [];

	constructor(private favoritesService: FavoritesService) {}

	ngOnInit(): void {
		this.favoritesService.getFavorites().subscribe((response: Favorites) => {
			this.favoriteCrops = response.crops;
		});
	}
}
