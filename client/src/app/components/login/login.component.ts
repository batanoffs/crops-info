import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { saveTokenInCookies } from '../../utils/cookie';
import { LoginResponse } from '../../types/login.interface';

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
					this.authService.setAuthenticated();
				}
			} else {
				console.log('Login failed');
				//clear form input fields
				form.reset();
			}
		});
	}
}
