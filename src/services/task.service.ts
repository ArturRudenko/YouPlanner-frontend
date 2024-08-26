import { ITask, TaskFormState } from '@/types/task.types';

import { axiosWithAuth } from '@/api/interceptors';

class TaskService {
	private BASE_URL = 'user/tasks';

	async getTasks() {
		return await axiosWithAuth.get<ITask[]>(this.BASE_URL);
	}

	async create(data: TaskFormState) {
		return await axiosWithAuth.post(this.BASE_URL, data);
	}

	async update(id: string, data: TaskFormState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
	}

	async delete(id: string) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
	}
}

export default new TaskService();
