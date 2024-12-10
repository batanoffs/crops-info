import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'catalog', component: CatalogComponent },
	{ path: 'catalog/:id', component: DetailsComponent },
	{ path: 'register', component: RegisterComponent },
	// { path: 'about', component: AboutComponent },
	// { path: 'favorites', component: FavoritesComponent },
	// { path: 'crop/:id', component: CropDetailComponent },
	{ path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
