import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Crop } from '../../../types/crop.interface';
import { RouterLink } from '@angular/router';
// private router: Router

@Component({
	selector: 'favorite-list',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './favorite-list.component.html',
	styleUrl: './favorite-list.component.scss',
})
export class FavoriteList {
	@Input() crop?: Crop;
	@Input() isAuthenticated: boolean = false;
	@Input() isFavorite: boolean = false;
	@Output() deleteEvent = new EventEmitter<string>();

	showButton = false;

	onDeleteClick() {
		this.deleteEvent.emit(this.crop?._id);
	}
}
