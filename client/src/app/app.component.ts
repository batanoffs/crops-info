import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navigation/navbar.component';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavbarComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss', '../styles.scss'],
	providers: [AuthService],
})
export class AppComponent {
	title = 'crops-info';
	isNavbarMinimized = false;

	updateNavbarMinimized(value: boolean): void {
		this.isNavbarMinimized = value;
	}
}
