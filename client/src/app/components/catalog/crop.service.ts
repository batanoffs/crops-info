import { Injectable } from '@angular/core';
import { API } from '../../common/serverApi';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Crop } from './crop.interface';

@Injectable()
export class CropService {
	URL = 'http://localhost:5000/api/crops';

	posts: Crop[] = [];
	constructor(private http: HttpClient) {}

	getCrops(): Observable<any> {
		return this.http.get(API.CATALOG);
	}

	getOneCrop(id: string) {
		return this.http.get(this.URL + '/' + id);
	}

	saveCrop(id: string) {
		return this.http.post(API.FAVORITES, { id });
	}
}
