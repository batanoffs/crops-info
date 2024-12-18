import { Component } from '@angular/core';
import { FavoritesService } from './favorites.service';
import { Crop } from '../../types/crop.interface';
import { Favorites } from '../../types/favorites.interface';
import { FavoriteList } from './favorite-list/favorite-list.component';

@Component({
	selector: 'app-favorites',
	standalone: true,
	imports: [FavoriteList],
	templateUrl: './favorites.component.html',
	styleUrl: './favorites.component.scss',
	providers: [FavoritesService],
})
export class FavoritesComponent {
	favoriteCrops: Crop[] = [];
	isAuthenticated: boolean = true;

	constructor(private favoritesService: FavoritesService) {}

	ngOnInit(): void {
		this.favoritesService.getFavorites().subscribe((response: Favorites) => {
			this.favoriteCrops = response.crops;
		});
	}

	onDelete(cropId: string) {
		this.favoritesService.removeOne(cropId).subscribe(() => {
			this.favoritesService.getFavorites().subscribe((response: Favorites) => {
				this.favoriteCrops = response.crops;
			});
		});
	}
}
