class DASHBOARD {
	private root = '/app';

	AUTH = '/auth';
	HOME = this.root;
	TASKS = `${this.root}/tasks`;
	HABITS = `${this.root}/habits`;
	POMODORO = `${this.root}/pomodoro`;
	TIMESLOTS = `${this.root}/timeslots`;
	SETTINGS = `${this.root}/settings`;
}

export const DASHBOARD_PAGES = new DASHBOARD();
