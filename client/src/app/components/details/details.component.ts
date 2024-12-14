import { Component } from '@angular/core';
import { Crop } from '../catalog/crop.interface';
import { ActivatedRoute } from '@angular/router';
import { CropService } from '../catalog/crop.service';
import { AuthService } from '../../services/auth.service';
import { getToken } from '../../utils/cookie';
import { CommonModule } from '@angular/common';
import { TransformAttr } from '../../directives/transformAttr.directive';

@Component({
	selector: 'app-details',
	standalone: true,
	imports: [CommonModule, TransformAttr],
	templateUrl: './details.component.html',
	styleUrl: './details.component.scss',
	providers: [CropService, AuthService, ],
})
export class DetailsComponent {
	crop = {} as Crop;
	isAuth = true;
	constructor(
		private route: ActivatedRoute,
		private authService: AuthService,
		private cropService: CropService
	) {}

	ngOnInit(): void {
		const token = getToken();
		if (!token) this.isAuth = false;
		console.log(this.isAuth);

		const id = this.route.snapshot.params['id'];

		this.cropService.getOneCrop(id).subscribe((response: any) => {
			if (this.hasAllAttributes(response)) {
				this.crop = response;
			} else {
				console.error('Crop data is incomplete:', response);
			}
		});
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

	private hasAllAttributes(crop: any): boolean {
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
