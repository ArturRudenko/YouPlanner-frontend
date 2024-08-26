import { ITimeslot, TimeslotFormState } from '@/types/timeslot.types';

import { axiosWithAuth } from '@/api/interceptors';

class TimeslotService {
	private BASE_URL = 'user/timeslots';

	async getTimeslots() {
		return await axiosWithAuth.get<ITimeslot[]>(this.BASE_URL);
	}

	async create(data: TimeslotFormState) {
		return await axiosWithAuth.post(this.BASE_URL, data);
	}

	async update(id: string, data: TimeslotFormState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
	}

	async updateOrder(ids: string[]) {
		return await axiosWithAuth.put(`${this.BASE_URL}/update-order`, { ids });
	}

	async delete(id: string) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
	}
}

export default new TimeslotService();
