import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CreateCropComponent } from './components/create-crop/create-crop.component';
import { guestGuard } from './middlewares/guest.guard';
import { authGuard } from './middlewares/auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent, canActivate: [guestGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
	{ path: 'catalog', component: CatalogComponent },
	{ path: 'catalog/:id', component: DetailsComponent },
	{ path: 'favorites', component: FavoritesComponent, canActivate: [authGuard] },
	{ path: 'create', component: CreateCropComponent, canActivate: [authGuard] },
	{ path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
