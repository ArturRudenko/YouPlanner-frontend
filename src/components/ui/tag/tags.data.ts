import { EnumTaskPriority, ITag } from '@/types/task.types';

export const TAGS_DATA: ITag[] = [
	{
		label: 'low',
		priority: EnumTaskPriority.low
	},
	{
		label: 'medium',
		priority: EnumTaskPriority.medium
	},
	{
		label: 'high',
		priority: EnumTaskPriority.high
	}
];
