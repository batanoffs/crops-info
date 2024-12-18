import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Crop } from '../../types/crop.interface';
import { CropService } from '../catalog/crop.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { attributes } from '../../constants/attributes';
import { UploadService } from '../create-crop/upload.service';

@Component({
	selector: 'app-edit-page',
	standalone: true,
	imports: [FormsModule, NgxFileDropModule],
	templateUrl: './edit-page.component.html',
	styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
	crop: Crop | null = null;
	formModel: any = {};

	// Options for dropdowns
	sunOptions = attributes.sunOptions;
	frostOptions = attributes.frostOptions;
	soilOptions = attributes.soilOptions;
	sowingTimeOptions = attributes.sowingTimeOptions;

	pictureUrl: string = '';
	isUploading = false;
	uploadError: string | null = null;
	vitamins: string[] = [];
	nutrients: string[] = [];
	formChanged = false;

	constructor(
		private route: ActivatedRoute,
		private cropService: CropService,
		private uploadService: UploadService,
		private router: Router
	) {}

	public files: NgxFileDropEntry[] = [];

	public fileOver(event: any) {
		console.log(event);
	}

	public fileLeave(event: any) {
		console.log(event);
	}

	ngOnInit(): void {
		// if (!this.crop) {
		// 	this.crop = { name: '', ...otherDefaultValues };
		// }

		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.cropService.getOneCrop(id).subscribe((response: any): Crop | void => {
				this.crop = response;
				this.initializeFormModel();
			});
		}
	}

	initializeFormModel() {
		if (!this.crop) return;
		this.formModel = {
			name: this.crop.name || '',
			description: this.crop.description || '',
			spacing: this.crop.attributes?.spacing || '',
			plantingDepth: this.crop.attributes?.plantingDepth || '',
			sun: this.crop.attributes?.sun || '',
			water: this.crop.attributes?.water || '',
			frost: this.crop.attributes?.frost || '',
			soil: this.crop.attributes?.soil || '',
			sproutToHarvest: this.crop.attributes?.sproutToHarvest || '',
			germination: this.crop.attributes?.germination || '',
			sowingTime: this.crop.attributes?.sowingTime || '',
		};
		this.pictureUrl = this.crop.picture || '';
		this.vitamins = this.crop.nutrition?.vitamins || [];
		this.nutrients = this.crop.nutrition?.nutrients || [];
	}

	// Mark form as changed
	onFieldChange() {
		this.formChanged = true;
	}

	// Add a vitamin
	addVitamin(vitamin: string) {
		const trimmedVitamin = vitamin.trim();
		if (trimmedVitamin.length === 1) {
			this.vitamins.push(trimmedVitamin.toUpperCase());
			// this.inputVitamin.control.setValue('');
		}
	}

	// Add a nutrient
	addNutrient(nutrient: string) {
		if (!nutrient) return;
		const trimmedNutrient = nutrient.trim();
		this.nutrients.push(trimmedNutrient);
	}

	// Remove a vitamin
	removeVitamin(index: number) {
		this.vitamins.splice(index, 1);
	}

	// Remove a nutrient
	removeNutrient(index: number) {
		this.nutrients.splice(index, 1);
	}

	onFileDropped(files: NgxFileDropEntry[]) {
		this.isUploading = true;
		this.uploadError = null;

		for (const droppedFile of files) {
			// Is it a file?
			if (droppedFile.fileEntry.isFile) {
				const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
				fileEntry.file((file: File) => {
					this.uploadService.uploadImage(file).subscribe({
						next: (event: HttpEvent<any>) => {
							if (event instanceof HttpResponse) {
								this.pictureUrl = event.body?.data.secure_url || '';
							}
							this.isUploading = false;
						},
						error: err => {
							this.uploadError = 'Failed to upload image. Please try again.';
							this.isUploading = false;
						},
					});
				});
			} else {
				// It was a directory (empty directories are added, otherwise only files)
				const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
				console.log(droppedFile.relativePath, fileEntry);
			}
		}
	}

	onSubmit(form: NgForm) {
		if (!this.crop) {
			console.error('Crop does not exist');
			return; // Ensure crop exists
		}

		if (!this.crop._id || this.crop._id === '') {
			console.error('Crop id is not valid.');
			return;
		}

		if (!form.valid) {
			alert('Please correct the errors in the form before submitting.');
			return;
		}

		const updatedCrop = {
			...this.crop,
			...this.formModel,
			picture: this.pictureUrl,
			nutrition: {
				vitamins: this.vitamins,
				nutrients: this.nutrients,
			},
		};

		// Submit the updated crop
		this.cropService.updateCrop(this.crop._id, updatedCrop).subscribe({
			next: response => {
				alert('Crop updated successfully!');

				console.log('Crop updated successfully:', response);

				// Reset after successful submit
				this.formChanged = false;

				// Redirect to the crop details page
				this.router.navigate(['/catalog', this.crop?._id]);
			},
			error: (err: Error) => alert(`Error updating crop: ${err.message}`),
		});
	}
}
