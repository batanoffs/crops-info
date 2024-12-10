import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    // Logic for handling form submission
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // Add further registration logic here
  }
}

