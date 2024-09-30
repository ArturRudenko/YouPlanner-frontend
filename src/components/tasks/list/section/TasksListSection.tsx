import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Dispatch, FC, SetStateAction } from 'react';

import { TasksListItem } from '@/components/tasks/list/item/TasksListItem';

import { ITask } from '@/types/task.types';

import styles from '../tasksList.module.scss';

import { COLUMNS_DATES } from '@/containers/tasks/columns.data';
import { filterTasks } from '@/helpers';

interface ITasksListSection {
	sectionId: string;
	label: string;
	tasks: ITask[];
	setTasks: Dispatch<SetStateAction<ITask[]>>;
}

export const TasksListSection: FC<ITasksListSection> = ({
	sectionId,
	label,
	tasks,
	setTasks
}) => {
	const addTask = (date: string) => {
		setTasks(prev => {
			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: date
				}
			];
		});
	};

	return (
		<Droppable droppableId={sectionId}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.colHeading}>
						<div className='w-full'>{label}</div>
					</div>

					{filterTasks(tasks, sectionId)?.map((item, index) => (
						<Draggable
							key={item.id}
							draggableId={item.id}
							index={index}
						>
							{provided => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<TasksListItem
										key={item.id}
										task={item}
										setTasks={setTasks}
									/>
								</div>
							)}
						</Draggable>
					))}
					{provided.placeholder}
					{sectionId !== 'completed' && !tasks?.some(item => !item.id) && (
						<div className={styles.addRow}>
							<button
								onClick={() => addTask(COLUMNS_DATES[sectionId].format())}
								className='italic opacity-40 text-sm'
							>
								Add task...
							</button>
						</div>
					)}
				</div>
			)}
		</Droppable>
	);
};
