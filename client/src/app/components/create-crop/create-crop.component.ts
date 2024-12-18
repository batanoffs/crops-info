import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { API } from '../../common/serverApi';
import { attributes } from '../../constants/attributes';
import { DataService } from './data.service';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
	selector: 'app-create-crop',
	standalone: true,
	imports: [FormsModule, NgxFileDropModule],
	templateUrl: './create-crop.component.html',
	styleUrls: ['./create-crop.component.scss'],
})
export class CreateCropComponent {
	sunOptions = attributes.sunOptions;
	frostOptions = attributes.frostOptions;
	soilOptions = attributes.soilOptions;
	sowingTimeOptions = attributes.sowingTimeOptions;
	pictureUrl: string = ''; // Holds the Cloudinary image URL
	isUploading = false; // Tracks upload progress
	uploadError: string | null = null; // Error message if upload fails
	vitamins: string[] = [];
	nutrients: string[] = [];

	public files: NgxFileDropEntry[] = [];

	public fileOver(event: any) {
		console.log(event);
	}

	public fileLeave(event: any) {
		console.log(event);
	}

	constructor(
		private http: HttpClient,
		private router: Router,
		private dataService: DataService
	) {}

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
					this.dataService.uploadImage(file).subscribe({
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

	createCrop(form: NgForm) {
		if (form.invalid || !this.pictureUrl) {
			return;
		}

		const data = {
			name: form.value.name,
			picture: this.pictureUrl,
			description: form.value.description,
			attributes: {
				spacing: form.value.spacing,
				plantingDepth: form.value.plantingDepth,
				sun: form.value.sun,
				water: form.value.water,
				frost: form.value.frost,
				soil: form.value.soil,
				sproutToHarvest: form.value.sproutToHarvest,
				germination: form.value.germination,
				sowingTime: form.value.sowingTime,
			},
			nutrition: {
				vitamins: this.vitamins,
				nutrients: this.nutrients,
			},
		};

		this.dataService.createCrop(data).subscribe({
			next: () => this.router.navigate(['/catalog']),
			error: err => console.error('Error creating crop', err),
		});
	}
}
