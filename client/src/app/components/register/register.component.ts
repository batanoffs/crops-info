import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
	providers: [AuthService],
})
export class RegisterComponent {
	@ViewChild('registerForm') form: NgForm | undefined;

	constructor(private authService: AuthService) {}

	onSubmit() {
		const form = this.form!;

		if (form.invalid) {
			console.log('Form is invalid');
			return;
		}

		if (form.value.password !== form.value.rePassword) {
			console.log('Passwords do not match');
			return;
		}

		this.authService
			.register(form.value.email, form.value.password, form.value.rePassword)
			.subscribe({
				next: response => {
					console.log('Auth Service response:', response);
				},
				error: err => {
					console.error('Registration failed:', err);
				}
		});
	}
}