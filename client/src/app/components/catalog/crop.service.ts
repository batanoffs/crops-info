import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API } from '../../common/serverApi'
import { Observable } from 'rxjs'

@Injectable()
export class CropService {
	constructor(private http: HttpClient) {}

	getCrops(): Observable<any> {
		return this.http.get(API.CATALOG)
	}

	saveCrop(crop: any) {
		return this.http.post(API.CATALOG, crop)
	}
}
