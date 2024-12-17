import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	console.warn('is user logged in: ', authService.isAuthenticated);

	if (!authService.isAuthenticated) {
		return true;
	} else {
		// Redirect to home page if already authenticated
		router.navigate(['/home']);
		return false;
	}
};

// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class GuestGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     if (!this.authService.isAuthenticated) {
//       return true;
//     } else {
//       // Redirect to home page if already authenticated
//       this.router.navigate(['/home']);
//       return false;
//     }
//   }
// }
