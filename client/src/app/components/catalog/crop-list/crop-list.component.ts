import { Component, Input } from '@angular/core';
import { Crop } from '../crop.interface';
import { RouterLink } from '@angular/router';
// private router: Router

@Component({
	selector: 'crop-list',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './crop-list.component.html',
	styleUrl: './crop-list.component.scss',
})
export class CropList {
	@Input('cropProp') crop: Crop | null = null;
}
