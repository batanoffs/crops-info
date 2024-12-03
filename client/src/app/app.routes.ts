import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
	{ path: '', component: AppComponent },
	{ path: 'login', component: LoginComponent },
	// { path: 'register', component: RegisterComponent },
	{ path: 'home', component: HomeComponent },
	// { path: 'about', component: AboutComponent },
	{ path: 'crops', component: CatalogComponent },
	// { path: 'favorites', component: FavoritesComponent },
	// { path: 'crop/:id', component: CropDetailComponent },
];
