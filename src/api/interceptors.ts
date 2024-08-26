import axios, { CreateAxiosDefaults } from 'axios';

import { errorCatch } from '@/api/error';

import AuthTokenService from '@/services/auth-token.service';
import AuthService from '@/services/auth.service';

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:4200/api',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
};

const axiosWithoutAuth = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = AuthTokenService.getAccessToken();

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

axiosWithAuth.interceptors.response.use(
	config => config,
	async err => {
		const originalRequest = err.config;

		if (
			(err?.response?.status === 401 ||
				errorCatch(err) === 'jwt expired' ||
				errorCatch(err) === 'jwt must be provided') &&
			err.config &&
			!err.config._isRetry
		) {
			originalRequest._isRetry = true;

			try {
				await AuthService.getNewTokens();
				return axiosWithAuth.request(originalRequest);
			} catch (error) {
				if (errorCatch(error) === 'jwt expired')
					AuthTokenService.removeAccessToken();
			}
		}

		throw err;
	}
);

export { axiosWithoutAuth, axiosWithAuth };
