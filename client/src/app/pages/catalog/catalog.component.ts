import { Component, OnInit } from '@angular/core';
import { CropList } from './crop-list/crop-list.component';
import { Crop } from './crop';
import { CropService } from '../../services/crop.service';

@Component({
	selector: 'crops-catalog',
	standalone: true,
	imports: [CropList],
	templateUrl: './catalog.component.html',
	styleUrl: './catalog.component.scss',
  providers: [CropService],
})
export class CatalogComponent implements OnInit {
	crops: Crop[] = [];

	constructor(private cropService: CropService) {}

	ngOnInit(): void {
		this.cropService.getCrops().subscribe((response: any) => {
			this.crops = response;
		});
	}
}
