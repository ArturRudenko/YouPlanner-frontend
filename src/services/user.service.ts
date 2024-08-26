import { IUser, UserFormData } from '@/types/auth.types';

import { axiosWithAuth } from '@/api/interceptors';

export interface IStatisticsItem {
	label: string;
	value: string;
}

export interface IProfileResponse {
	user: IUser;
	statistics: IStatisticsItem[];
}

class UserService {
	private BASE_URL = 'user/profile';

	async getProfile(): Promise<IProfileResponse> {
		const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL);
		return response.data;
	}

	async update(data: UserFormData) {
		const response = await axiosWithAuth.put(this.BASE_URL, data);
		return response.data;
	}
}

export default new UserService();
