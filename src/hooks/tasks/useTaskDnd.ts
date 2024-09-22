import { DropResult } from '@hello-pangea/dnd';

import useUpdateTask from '@/hooks/tasks/useUpdateTask';

import { COLUMNS_DATES } from '@/containers/tasks/columns.data';

export default function useTaskDnd() {
	const { updateTask } = useUpdateTask();

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const columnId = result.destination.droppableId;
		const columnDate = COLUMNS_DATES[columnId].format();

		switch (columnId) {
			case result.source.droppableId:
				return;
			case 'completed': {
				updateTask({
					id: result.draggableId,
					data: {
						isCompleted: true
					}
				});

				return;
			}
			default: {
				updateTask({
					id: result.draggableId,
					data: {
						createdAt: columnDate,
						isCompleted: false
					}
				});
			}
		}
	};

	return { onDragEnd };
}
