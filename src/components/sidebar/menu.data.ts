import {
	CalendarRange,
	KanbanSquare,
	LayoutDashboard,
	type LucideIcon,
	Settings,
	Timer
} from 'lucide-react';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

export interface IMenuItem {
	name: string;
	link: string;
	icon: LucideIcon;
}

export const MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.HOME,
		name: 'Dashboard'
	},
	{
		icon: KanbanSquare,
		link: DASHBOARD_PAGES.TASKS,
		name: 'Tasks'
	},
	{
		icon: Timer,
		link: DASHBOARD_PAGES.POMODORO,
		name: 'Pomodoro'
	},
	{
		icon: CalendarRange,
		link: DASHBOARD_PAGES.TIMESLOTS,
		name: 'Timeslots'
	},
	{
		icon: Settings,
		link: DASHBOARD_PAGES.SETTINGS,
		name: 'Settings'
	}
];
