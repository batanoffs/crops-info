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

	isOwner(ownerId: string) {
		const token = getToken();
		return this.http.get(API.IS_OWNER + ownerId, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
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

	updateCrop(id: string, updatedCrop: Crop): Observable<Crop> {
		const token = getToken();

		return this.http.put<Crop>(API.CATALOG + id, updatedCrop, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}
}
