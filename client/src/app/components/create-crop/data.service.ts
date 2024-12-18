import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { API } from '../../common/serverApi';
import { Observable } from 'rxjs';
import { getToken } from '../../utils/cookie';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	constructor(private http: HttpClient) {}

	uploadImage(file: File): Observable<HttpEvent<any>> {
		const formData: FormData = new FormData();
		formData.append('file', file, file.name);

		const req = new HttpRequest('POST', API.UPLOAD, formData, {
			reportProgress: true,
		});

		return this.http.request(req);
	}

	createCrop(data: any): Observable<any> {
		const userToken = getToken();
		if (!userToken) {
			console.error('User not authorized');
			return new Observable(observer => observer.error('User not authorized'));
		}
		return this.http.post(API.CREATE, data, {
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		});
	}
}
