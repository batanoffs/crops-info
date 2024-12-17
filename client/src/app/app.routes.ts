import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CreateCropComponent } from './components/create-crop/create-crop.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent, canActivate: [guestGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
	{ path: 'catalog', component: CatalogComponent },
	{ path: 'catalog/:id', component: DetailsComponent },
	{ path: 'favorites', component: FavoritesComponent },
	{ path: 'create', component: CreateCropComponent },
	{ path: 'error', component: ErrorMsgComponent },
	{ path: '404', component: PageNotFoundComponent },
	{ path: '**', redirectTo: '/404' },
];
