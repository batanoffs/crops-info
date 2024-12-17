import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { API } from '../../common/serverApi';
import { attributes } from '../../constants/attributes';
import { UploadService } from './upload.service';
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

	public files: NgxFileDropEntry[] = [];

	constructor(
		private http: HttpClient,
		private router: Router,
		private uploadService: UploadService
	) {}

	onFileDropped(files: NgxFileDropEntry[]) {
		this.isUploading = true;
		this.uploadError = null;

		for (const droppedFile of files) {
			// Is it a file?
			if (droppedFile.fileEntry.isFile) {
				const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
				fileEntry.file((file: File) => {
					// Here you can access the real file
					console.log(droppedFile.relativePath, file);
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

	public fileOver(event: any) {
		console.log(event);
	}

	public fileLeave(event: any) {
		console.log(event);
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
		};

		this.http.post(API.CREATE, data).subscribe({
			next: () => this.router.navigate(['/crops']),
			error: err => console.error('Error creating crop', err),
		});
	}

	goBackHandler() {
		this.router.navigate(['/crops']);
	}
}
