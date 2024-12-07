import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'crops', component: CatalogComponent },
	// { path: 'register', component: RegisterComponent },
	// { path: 'about', component: AboutComponent },
	// { path: 'favorites', component: FavoritesComponent },
	// { path: 'crop/:id', component: CropDetailComponent },
];
