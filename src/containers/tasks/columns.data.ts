import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

interface IColumn {
	id: string;
	label: string;
}

export const COLUMNS: IColumn[] = [
	{
		id: 'today',
		label: 'Today'
	},
	{
		id: 'tomorrow',
		label: 'Tomorrow'
	},
	{
		id: 'onThisWeek',
		label: 'On this week'
	},
	{
		id: 'onNextWeek',
		label: 'On next week'
	},
	{
		id: 'later',
		label: 'Later'
	},
	{
		id: 'completed',
		label: 'Completed'
	}
];

export const COLUMNS_DATES: Record<string, Dayjs> = {
	today: dayjs().startOf('day'),
	tomorrow: dayjs().add(1, 'day').startOf('day'),
	onThisWeek: dayjs().endOf('isoWeek'),
	onNextWeek: dayjs().add(1, 'week').startOf('day'),
	later: dayjs().add(2, 'week').startOf('day')
};
