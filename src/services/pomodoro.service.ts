import {
	IPomodoroSession,
	PomodoroRoundState,
	PomodoroSessionState
} from '@/types/pomodoro.types';

import { axiosWithAuth } from '@/api/interceptors';

class PomodoroService {
	private BASE_URL = 'user/pomodoro';

	async getToday() {
		return await axiosWithAuth.get<IPomodoroSession>(`${this.BASE_URL}/today`);
	}

	async create() {
		return await axiosWithAuth.post<IPomodoroSession>(this.BASE_URL);
	}

	async update(id: string, data: PomodoroSessionState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
	}

	async updateRound(id: string, data: PomodoroRoundState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/round/${id}`, data);
	}

	async delete(id: string) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`);
	}
}

export default new PomodoroService();
