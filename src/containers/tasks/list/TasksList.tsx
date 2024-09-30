import { DragDropContext } from '@hello-pangea/dnd';
import { FC } from 'react';

import { TasksListSection } from '@/components/tasks/list/section/TasksListSection';

import useTaskDnd from '@/hooks/tasks/useTaskDnd';
import useTasks from '@/hooks/tasks/useTasks';

import styles from '../../../components/tasks/list/tasksList.module.scss';

import { COLUMNS } from '@/containers/tasks/columns.data';

export const TasksList: FC = () => {
	const { tasks, setTasks } = useTasks();
	const { onDragEnd } = useTaskDnd();

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.table}>
				<div className={styles.header}>
					<div>Task name</div>
					<div>Due date</div>
					<div>Priority</div>
					<div></div>
				</div>

				<div className={styles.parentsWrapper}>
					{COLUMNS.map(column => (
						<TasksListSection
							key={column.id}
							tasks={tasks}
							label={column.label}
							sectionId={column.id}
							setTasks={setTasks}
						/>
					))}
				</div>
			</div>
		</DragDropContext>
	);
};
