import Cookies from 'js-cookie';

import { EnumTokens } from '@/enums/auth.enum';

class AuthTokenService {
	constructor(private cookies: Cookies.CookiesStatic) {}
	getAccessToken = () => this.cookies.get(EnumTokens.ACCESS_TOKEN) || null;

	saveAccessToken = (token: string) =>
		this.cookies.set(EnumTokens.ACCESS_TOKEN, token, {
			domain: 'localhost',
			sameSite: 'strict',
			expires: 1
		});

	removeAccessToken = () => this.cookies.remove(EnumTokens.ACCESS_TOKEN);
}

export default new AuthTokenService(Cookies);
