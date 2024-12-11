const baseURL = 'http://localhost:5000/api/'

const endpoints = {
	crops: baseURL + 'crops/',
	auth: baseURL + 'auth/',
}

export const API = {
	CATALOG: endpoints.crops,
	LOGIN: endpoints.auth + 'login',
	REGISTER: endpoints.auth + 'register',
	LOGOUT: endpoints.auth + 'logout',
}
