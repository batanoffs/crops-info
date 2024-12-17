import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { API } from '../../common/serverApi';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UploadService {
	constructor(private http: HttpClient) {}

	uploadImage(file: File): Observable<HttpEvent<any>> {
		const formData: FormData = new FormData();
		formData.append('file', file, file.name);

		const req = new HttpRequest('POST', API.UPLOAD, formData, {
			reportProgress: true,
		});

		return this.http.request(req);
	}
}
