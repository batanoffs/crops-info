import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Crop } from '../../types/crop.interface';
import { CropService } from '../catalog/crop.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
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
		private route: ActivatedRoute,
		private cropService: CropService,
		private uploadService: UploadService
	) {}

    ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.cropService.getOneCrop(id).subscribe((response: any): Crop | void => {
				this.crop = response;
                this.pictureUrl = this.crop?.picture || '';
                this.vitamins = this.crop?.nutrition?.vitamins || [];
                this.nutrients = this.crop?.nutrition?.nutrients || [];
			});
		}
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
		console.log('Form submitted:', form.value);
	}
}
