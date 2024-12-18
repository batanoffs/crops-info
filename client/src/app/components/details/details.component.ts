import { Component } from '@angular/core';
import { Crop } from '../../types/crop.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CropService } from '../catalog/crop.service';
import { AuthService } from '../../services/auth.service';
import { getToken } from '../../utils/cookie';
import { CommonModule } from '@angular/common';
import { TransformAttr } from '../../directives/transformAttr.directive';
import { FavoritesService } from '../favorites/favorites.service';

@Component({
	selector: 'app-details',
	standalone: true,
	imports: [CommonModule, TransformAttr, RouterLink],
	templateUrl: './details.component.html',
	styleUrl: './details.component.scss',
	providers: [CropService, AuthService, FavoritesService],
})
export class DetailsComponent {
	crop = {} as Crop;
	isAuth = false;
	userFavorites: Crop[] = [];

	constructor(
		private route: ActivatedRoute,
		private favoritesService: FavoritesService,
		private cropService: CropService
	) {}

	ngOnInit(): void {
		// TODO update isAuth to be generated based on authService - so update methods there as well
		let ownerId = '';

		const token = getToken();
		if (token && token !== '') {
			this.isAuth = true;
		} else {
			this.isAuth = false;
		}

		const id = this.route.snapshot.params['id'];
		this.cropService.getOneCrop(id).subscribe((response: any) => {
			if (this.hasAllAttributes(response)) {
				this.crop = response;
			} else {
				console.error('Crop data is incomplete:', response);
			}
		});
		this.favoritesService.getFavorites().subscribe((response: any) => {
			this.userFavorites = response.crops;
		});
	}

	isFavorite(): boolean {
		if (!this.userFavorites) return false;
		console.log(
			'isFavorite',
			this.userFavorites.some(crop => crop._id === this.crop._id)
		);

		return this.userFavorites.some(crop => crop._id === this.crop._id);
	}

	addToFavorites(): void {
		if (!this.isAuth) {
			alert('Please log in to add this crop to favorites.');
			return;
		}

		this.cropService.saveCrop(this.crop._id).subscribe(response => {
			console.log('Crop added to favorites:', response);
		});
	}

	private hasAllAttributes(crop: Crop): boolean {
		const requiredAttributes = [
			'_id',
			'name',
			'picture',
			'description',
			'attributes',
			'nutrition',
			'pests',
			'diseases',
			'companionPlants',
			'combativePlants',
			'createdAt',
		];
		return requiredAttributes.every(attr => crop.hasOwnProperty(attr));
	}
}
