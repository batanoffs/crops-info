import { Injectable } from '@angular/core';
import { API } from '../../common/serverApi';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Crop } from '../../types/crop.interface';
import { getToken } from '../../utils/cookie';

@Injectable()
export class FavoritesService {
	private token: string | undefined = getToken();

	posts: Crop[] = [];

	constructor(private http: HttpClient) {}

	getFavorites(): Observable<any> {
		if (this.token === undefined) {
			return throwError(() => new Error('User is not logged in.'));
		}
		return this.http.get(API.FAVORITES, {
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		});
	}

	removeOne(cropId: string): Observable<any> {
		if (this.token === undefined) {
			return throwError(() => new Error('User is not logged in.'));
		}
		return this.http.delete(API.FAVORITES + cropId, {
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		});
	}
}
