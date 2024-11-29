import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = false;


  // Simulate a login method
  login(username: string, password: string): boolean {
    // Replace this with actual API call for authentication
    if (username === 'user' && password === 'password') {
      this._isAuthenticated = true;
      return true;
    }
    return false;
  }

  // Logout method
  logout(): void {
    this._isAuthenticated = false;
  }

  // Getter for authentication status
  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
}
