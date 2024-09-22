import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TaskFormState } from '@/types/task.types';

import taskService from '@/services/task.service';

type TaskUpd = { id: string; data: TaskFormState };

export default function useUpdateTask(key?: string) {
	const queryClient = useQueryClient();

	const { mutate: updateTask } = useMutation({
		mutationKey: ['update task', key],
		mutationFn: ({ id, data }: TaskUpd) => taskService.update(id, data),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
	});

	return { updateTask };
}
