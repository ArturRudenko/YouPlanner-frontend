import debounce from 'lodash.debounce';
import { useCallback, useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';

import { TaskFormState } from '@/types/task.types';

import useCreateTask from '@/hooks/tasks/useCreateTask';
import useUpdateTask from '@/hooks/tasks/useUpdateTask';

type debouncedTaskProps = { watch: UseFormWatch<TaskFormState>; id?: string };

export default function useDebouncedTask({ watch, id }: debouncedTaskProps) {
	const { createTask } = useCreateTask();
	const { updateTask } = useUpdateTask();

	const creteTaskDebounced = useCallback(
		debounce((formData: TaskFormState) => createTask(formData), 400),
		[]
	);

	const updateTaskDebounced = useCallback(
		debounce(
			(formData: TaskFormState) => updateTask({ id: id ?? '', data: formData }),
			400
		),
		[]
	);

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (id) {
				updateTaskDebounced({
					...formData,
					priority: formData.priority || undefined
				});
			} else creteTaskDebounced(formData);
		});

		return () => {
			unsubscribe();
		};
	}, [watch, id]);
}
