import { Component, OnInit } from '@angular/core';
import { CropList } from './crop-list/crop-list.component';
import { Crop } from '../../types/crop.interface';
import { CropService } from './crop.service';

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
	pageSize = 6;
	page = 1;

	constructor(private cropService: CropService) {}

	ngOnInit(): void {
		this.getCrops();
	}

	getCrops(): void {
		this.cropService.getCrops().subscribe((response: any) => {
			this.crops = response;
		});
	}

	get pages(): number[] {
		return Array.from(
			{ length: Math.ceil(this.crops.length / this.pageSize) },
			(_, i) => i + 1
		);
	}

	get paginatedCrops(): Crop[] {
		const start = (this.page - 1) * this.pageSize;
		const end = this.page * this.pageSize;
		return this.crops.slice(start, end);
	}

	goToPage(page: number): void {
		if (page >= 1 && page <= this.pages.length) {
			this.page = page;
		}
	}
}
