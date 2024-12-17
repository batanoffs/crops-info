import { Injectable } from '@angular/core';
import { API } from '../common/serverApi';
import { HttpClient } from '@angular/common/http';
import { clearTokenInCookies } from '../utils/cookie';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

	private _isAuthenticated = false;

	login(email: string, password: string) {
		return this.http.post(API.LOGIN, { email, password });
	}

	register(email: string, password: string, rePassword: string) {
		return this.http.post(API.REGISTER, { email, password, rePassword });
	}

	// Logout method
	logout(): void {
		this.http.get(API.LOGOUT);
		this._isAuthenticated = false;
		clearTokenInCookies();
	}

	// Getter for authentication status
	get isAuthenticated(): boolean {
		return this._isAuthenticated;
	}

	setAuthenticated() {
		this._isAuthenticated = true;
	}
}
