import { Injectable } from '@angular/core';
import { API } from '../../common/serverApi';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Crop } from '../../types/crop.interface';
import { getToken } from '../../utils/cookie';

@Injectable({
	providedIn: 'root',
})
export class CropService {
	posts: Crop[] = [];
	constructor(private http: HttpClient) {}

	getCrops(): Observable<any> {
		return this.http.get(API.CATALOG);
	}

	getOneCrop(id: string) {
		return this.http.get(API.CATALOG + id);
	}

	saveCrop(id: string) {
		const token = getToken();
		return this.http.post(
			API.FAVORITES,
			{ id },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	}
}
