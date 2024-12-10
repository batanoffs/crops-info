import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navigation/navbar.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavbarComponent, RouterLink, RouterLinkActive],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'crops-info';
}
