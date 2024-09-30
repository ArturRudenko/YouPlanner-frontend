import cn from 'clsx';
import { GripVertical, Loader, Trash } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Checkbox from '@/components/ui/checkbox/Checkbox';
import { DatePicker } from '@/components/ui/date-picker/DatePicker';
import { TagSelect } from '@/components/ui/tag/select/TagSelect';
import { TAGS_DATA } from '@/components/ui/tag/tags.data';

import { ITask, TaskFormState } from '@/types/task.types';

import useDebouncedTask from '@/hooks/tasks/useDebouncedTask';
import useDeleteTask from '@/hooks/tasks/useDeleteTask';

import styles from '../tasksList.module.scss';

interface ITasksListItem {
	task: ITask;
	setTasks: Dispatch<SetStateAction<ITask[]>>;
}

export const TasksListItem: FC<ITasksListItem> = ({ task, setTasks }) => {
	const { register, control, watch } = useForm<TaskFormState>({
		defaultValues: {
			name: task.name,
			isCompleted: task.isCompleted,
			createdAt: task.createdAt,
			priority: task.priority
		}
	});

	const { deleteTask, isDeletePending } = useDeleteTask();
	useDebouncedTask({ watch, id: task.id });

	return (
		<div
			className={cn(
				styles.row,
				watch('isCompleted') ? styles.completed : '',
				'animation-opacity'
			)}
		>
			<div className={styles.gripWrapper}>
				<GripVertical className={styles.grip} />
			</div>
			<Controller
				control={control}
				name='isCompleted'
				render={({ field: { value, onChange } }) => (
					<Checkbox
						onChange={onChange}
						checked={value}
					/>
				)}
			/>
			<input
				className={styles.transparentInput}
				{...register('name')}
			/>
			<Controller
				control={control}
				name='createdAt'
				render={({ field: { value, onChange } }) => (
					<DatePicker
						onChange={onChange}
						value={value || ''}
					/>
				)}
			/>
			<Controller
				control={control}
				name='priority'
				render={({ field: { value, onChange } }) => (
					<TagSelect
						data={TAGS_DATA}
						onChange={onChange}
						priority={value}
					/>
				)}
			/>
			<button
				onClick={() =>
					task.id ? deleteTask(task.id) : setTasks(prev => prev?.slice(0, -1))
				}
				disabled={isDeletePending}
				className={styles.btn}
			>
				{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
			</button>
		</div>
	);
};
