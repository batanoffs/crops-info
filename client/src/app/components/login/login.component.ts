import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	username = '';
	password = '';
	loginFailed = false;

	constructor(private authService: AuthService, private router: Router) {}

	onLogin() {
		const success = this.authService.login(this.username, this.password);
		if (success) {
			this.router.navigate(['/home']);
		} else {
			this.loginFailed = true;
		}
	}
}
