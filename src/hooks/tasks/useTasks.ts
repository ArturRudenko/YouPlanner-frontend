import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { ITask } from '@/types/task.types';

import taskService from '@/services/task.service';

export default function useTasks() {
	const { data } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasks()
	});

	const [items, setItems] = useState<ITask[]>(data?.data || []);

	useEffect(() => {
		setItems(data?.data || []);
	}, [data?.data]);

	return { items, setItems };
}
