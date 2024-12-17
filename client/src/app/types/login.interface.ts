export interface LoginResponse {
	success: boolean;
	redirectUrl?: string;
	message: string;
	token?: string;
}