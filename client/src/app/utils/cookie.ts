export const saveTokenInCookies = (value: string) => {
	const date = new Date();
	date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
	const expires = 'expires=' + date.toUTCString();
	document.cookie = 'token=' + value + ';' + expires + ';path=/';
};

export const clearTokenInCookies = () =>
	(document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/');

export const getToken = (): string | undefined => {
	const cookieName = 'token=';
	const cookies = document.cookie.split(';');
	const tokenCookie = cookies.find(cookie => cookie.trim().startsWith(cookieName));

	if (!tokenCookie) return undefined;

	const token = tokenCookie.split('=')[1];

	if (!token || token === 'undefined' || token === 'null') return undefined;

	return token;
};
