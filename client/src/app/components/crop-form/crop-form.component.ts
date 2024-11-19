import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { CropService } from '../../services/crop.service'

@Component({
	selector: 'app-crop-form',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
	providers: [CropService],
	templateUrl: './crop-form.component.html',
	styleUrl: './crop-form.component.scss',
})
export class CropFormComponent {
	cropForm: FormGroup

	constructor(private fb: FormBuilder, private cropService: CropService) {
		this.cropForm = this.fb.group({
			name: [''],
			sowingDistance: [0],
		})
	}

	onSubmit() {
		const crop = this.cropForm.value
		this.cropService.saveCrop(crop).subscribe(() => {
			alert('Crop saved successfully')
		})
	}
}
