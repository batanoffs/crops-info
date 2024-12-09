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

	getPosts() {
		return this.http.get(this.URL);
	}

	getCrops(): Observable<any> {
		return this.http.get(API.CATALOG);
	}

	saveCrop(crop: any) {
		return this.http.post(API.CATALOG, crop);
	}
}
