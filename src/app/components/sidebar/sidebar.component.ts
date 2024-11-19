import { Component, Output, EventEmitter } from '@angular/core'
import { CropService } from '../../services/crop.service'
import { CropList } from '../crop-list/crop-list.component'

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CropList],
	providers: [CropService],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
	crops = [1, 2, 3]

	@Output() cropSelected = new EventEmitter<any>()

	constructor(private cropService: CropService) {}

	ngOnInit() {
		this.fetchCrops()
	}

	fetchCrops() {
		this.cropService.getCrops().subscribe((data: any) => {
			this.crops = data
		})
	}

	onSelectCrop(crop: any) {
		this.cropSelected.emit(crop)
	}

	openCropForm(event: MouseEvent) {
		event.preventDefault()
		console.log(event)
	}
}
