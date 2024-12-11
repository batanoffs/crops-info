import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getToken } from '../../utils/cookie';

@Component({
	selector: 'navbar',
	standalone: true,
	imports: [CommonModule, RouterModule],
	providers: [AuthService],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
	constructor(private authService: AuthService, private router: Router) {}

	get menuItems() {
		const token = getToken();

		if (token !== '' && token !== undefined && token !== null)
			this.authService.setAuthenticated();

		return this.authService.isAuthenticated
			? [
					{ label: 'Home', link: '/home' },
					{ label: 'About', link: '/about' },
					{ label: 'Crops', link: '/catalog' },
					{ label: 'Favorite', link: '/favorites' },
					{ label: 'Logout', link: '/logout' },
			  ]
			: [
					{ label: 'Home', link: '/home' },
					{ label: 'Login', link: '/login' },
					{ label: 'Crops', link: '/catalog' },
			  ];
	}

	onLogout() {
		this.authService.logout();

		this.router.navigate(['/']);
	}
}
