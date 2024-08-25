import Cookies from 'js-cookie';

enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

export const getAccessToken = () =>
	Cookies.get(EnumTokens.ACCESS_TOKEN) || null;

export const saveAccessToken = (token: string) =>
	Cookies.set(EnumTokens.ACCESS_TOKEN, token, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1
	});

export const removeAccessToken = (token: string) =>
	Cookies.remove(EnumTokens.ACCESS_TOKEN);
