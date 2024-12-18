import { environment } from '../../environments/environment';

const baseURL = environment.apiUrl;

const endpoints = {
	crops: baseURL + '/crops/',
	auth: baseURL + '/auth/',
	favorites: baseURL + '/favorites/',
};

export const API = {
	CATALOG: endpoints.crops,
	LOGIN: endpoints.auth + 'login',
	REGISTER: endpoints.auth + 'register',
	LOGOUT: endpoints.auth + 'logout',
	FAVORITES: endpoints.favorites,
	CREATE: endpoints.crops,
	UPLOAD: endpoints.crops + 'upload',
};
