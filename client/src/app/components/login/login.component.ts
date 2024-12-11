import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { saveTokenInCookies } from '../../utils/cookie';

interface LoginResponse {
	success: boolean;
	redirectUrl?: string;
	message: string;
	token?: string;
}

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [RouterLink, FormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
	providers: [AuthService],
})
export class LoginComponent {
	@ViewChild('loginForm') form: NgForm | undefined;

	constructor(private authService: AuthService, private router: Router) {}

	onLogin() {
		const form = this.form!;

		console.log(form.value);

		if (form.invalid) {
			console.log('Form is invalid');
			return;
		}

		this.authService.login(form.value.email, form.value.password).subscribe(response => {
			const loginResponse = response as LoginResponse;
			if (loginResponse?.success) {
				if (loginResponse.token) {
					saveTokenInCookies(loginResponse.token);
					this.router.navigate([`${loginResponse.redirectUrl}`]);
					console.log(this.authService.isAuthenticated);
					this.authService.setAuthenticated();
					console.log(this.authService.isAuthenticated);
				}
			} else {
				console.log('Login failed');
				//clear form input fields
				form.reset();
			}
		});
	}
}
