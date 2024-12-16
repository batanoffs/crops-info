import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
	@Input() isNavbarMinimized: boolean = false;
	@Output() isNavbarMinimizedChange = new EventEmitter<boolean>();
	toggleIcon = '<';

	constructor(private authService: AuthService, private router: Router) {}

	toggleNavbar() {
		this.isNavbarMinimized = !this.isNavbarMinimized;
		this.isNavbarMinimizedChange.emit(this.isNavbarMinimized);
		this.toggleIcon = this.isNavbarMinimized ? '>' : '<';
	}

	get menuItems() {
		const token = getToken();

		if (token !== '' && token !== undefined && token !== null)
			this.authService.setAuthenticated();

		return this.authService.isAuthenticated
			? [
					{ label: 'Home', link: '/home' },
					{ label: 'Crops', link: '/catalog' },
					{ label: 'Favorites', link: '/favorites' },
					{ label: 'Create Crop', link: '/create' },
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
