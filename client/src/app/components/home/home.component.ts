import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	partners = [
		{
			name: 'Urban Gardening Sofia',
			image: 'https://res.cloudinary.com/dzh01qrmx/image/upload/v1734178435/cropped-logo-3-288x300_sywzne.png',
			link: 'https://www.urbangardening-sofia.com/',
		},
		{
			name: 'Urban Gardening Sofia',
			image: 'https://res.cloudinary.com/dzh01qrmx/image/upload/v1734178435/cropped-logo-3-288x300_sywzne.png',
			link: 'https://www.urbangardening-sofia.com/',
		},
		{
			name: 'Urban Gardening Sofia',
			image: 'https://res.cloudinary.com/dzh01qrmx/image/upload/v1734178435/cropped-logo-3-288x300_sywzne.png',
			link: 'https://www.urbangardening-sofia.com/',
		},
	];

	handleCommunityClick(url: string) {
		window.open(url, '_blank');
	}
}
