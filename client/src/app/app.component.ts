import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navigation/navbar.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavbarComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss', '../styles.scss'],
})
export class AppComponent {
	title = 'crops-info';
	isNavbarMinimized = false;

	constructor() {
		console.log('isNavbarMinimized', this.isNavbarMinimized);
	}

	updateNavbarMinimized(value: boolean): void {
		this.isNavbarMinimized = value;
	}
}
