import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule, Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule, RouterModule],
	providers: [],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
	constructor(private authService: AuthService, private router: Router) {}

	get menuItems() {
		return this.authService.isAuthenticated
			? [
					{ label: 'Home', link: '/home' },
					{ label: 'About', link: '/about' },
					{ label: 'Crops', link: '/crops' },
					{ label: 'Favorites', link: '/favorites' },
					{ label: 'Logout', link: '/logout' },
			  ]
			: [
					{ label: 'Home', link: '/home' },
					{ label: 'Login', link: '/login' },
					{ label: 'Crops', link: '/crops' },
			  ]
	}

	onLogout() {
		this.authService.logout()
		// Optionally redirect to login or home
		this.router.navigate(['/login'])
	}
}
