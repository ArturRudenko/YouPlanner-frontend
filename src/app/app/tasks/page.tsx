import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Tasks } from '@/containers/tasks/Tasks';

export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE
};

export default function TasksListPage() {
	return (
		<>
			<h1>Tasks</h1>
			<Tasks />
		</>
	);
}
