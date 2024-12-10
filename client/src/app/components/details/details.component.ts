import { Component } from '@angular/core';
import { Crop } from '../catalog/crop.interface';
import { ActivatedRoute } from '@angular/router';
import { CropService } from '../catalog/crop.service';

@Component({
	selector: 'app-details',
	standalone: true,
	imports: [],
	templateUrl: './details.component.html',
	styleUrl: './details.component.scss',
	providers: [CropService],
})
export class DetailsComponent {
	crop = {} as Crop;

	constructor(private route: ActivatedRoute, private cropService: CropService) {}

	ngOnInit(): void {
		// const id = this.route.snapshot.params;
		const id = this.route.snapshot.params['id'];

		this.cropService.getOneCrop(id).subscribe((response: any) => {
			this.crop = response;
		});
	}
}
