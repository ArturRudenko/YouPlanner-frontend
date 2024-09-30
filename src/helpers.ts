import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { ITask } from '@/types/task.types';

import { COLUMNS_DATES } from '@/containers/tasks/columns.data';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

//TODO add factory to divide tasks by columns on getter execution
export const filterTasks = (tasks: ITask[], columnId: string) => {
	switch (columnId) {
		case 'today':
			return tasks?.filter(
				item =>
					dayjs(item.createdAt).isSame(COLUMNS_DATES.today, 'day') &&
					!item.isCompleted
			);

		case 'tomorrow':
			return tasks?.filter(
				item =>
					dayjs(item.createdAt).isSame(COLUMNS_DATES.tomorrow, 'day') &&
					!item.isCompleted
			);

		case 'on-this-week':
			return tasks?.filter(
				item =>
					!dayjs(item.createdAt).isSame(COLUMNS_DATES.today) &&
					!dayjs(item.createdAt).isSame(COLUMNS_DATES.tomorrow) &&
					dayjs(item.createdAt).isSameOrBefore(COLUMNS_DATES['on-this-week']) &&
					!item.isCompleted
			);

		case 'on-next-week':
			return tasks?.filter(
				item =>
					dayjs(item.createdAt).isAfter(COLUMNS_DATES['on-this-week']) &&
					dayjs(item.createdAt).isSameOrBefore(COLUMNS_DATES['on-next-week']) &&
					!item.isCompleted
			);

		case 'later':
			return tasks?.filter(
				item =>
					(dayjs(item.createdAt).isAfter(COLUMNS_DATES['on-next-week']) ||
						!item.createdAt) &&
					!item.isCompleted
			);

		case 'completed':
			return tasks?.filter(item => item.isCompleted);

		default:
			return [];
	}
};

export const makeFirstLetterCapital = (word: string): string =>
	`${word.charAt(0).toUpperCase()}${word.slice(1)}`;
