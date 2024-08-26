import { IAuthForm, IAuthResponse } from '@/types/auth.types';

import { axiosWithoutAuth } from '@/api/interceptors';

import AuthTokenService from '@/services/auth-token.service';

type authType = 'login' | 'register';

class AuthService {
	constructor(private authTokenService: typeof AuthTokenService) {}

	async authorize(type: authType, data: IAuthForm) {
		const response = await axiosWithoutAuth.post<IAuthResponse>(
			`auth/${type}`,
			data
		);

		if (!!response.data.accessToken)
			this.authTokenService.saveAccessToken(response.data.accessToken);

		return response;
	}

	async getNewTokens() {
		const response = await axiosWithoutAuth.post<IAuthResponse>(
			`auth/login/get-new-tokens`
		);

		if (!!response.data.accessToken)
			this.authTokenService.saveAccessToken(response.data.accessToken);

		return response;
	}

	async logout() {
		const response = await axiosWithoutAuth.post<IAuthResponse>(`auth/logout`);

		if (response.data) this.authTokenService.removeAccessToken();

		return response;
	}
}

export default new AuthService(AuthTokenService);
