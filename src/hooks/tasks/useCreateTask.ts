import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TaskFormState } from '@/types/task.types';

import TaskService from '@/services/task.service';

export default function useCreateTask() {
	const queryClient = useQueryClient();

	const { mutate: createTask } = useMutation({
		mutationKey: ['create task'],
		mutationFn: (data: TaskFormState) => TaskService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			});
		}
	});

	return { createTask };
}
