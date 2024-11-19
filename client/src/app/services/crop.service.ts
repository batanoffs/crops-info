import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class CropService {
	private apiUrl = 'http://localhost:5000/api/vegetables'

	constructor(private http: HttpClient) {}

	getCrops() {
		return this.http.get(this.apiUrl)
	}

	saveCrop(crop: any) {
		return this.http.post(this.apiUrl, crop)
	}
}
