import { Component, Input } from '@angular/core';
import { Crop } from '../crop';

@Component({
	selector: 'crop-list',
	standalone: true,
	imports: [],
	templateUrl: './crop-list.component.html',
	styleUrl: './crop-list.component.scss',
})
export class CropList {
	@Input('cropProp') crop: Crop | null = null;
}
