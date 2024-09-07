import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Statistics } from '@/containers/statistics/Statistics';

export const metadata: Metadata = {
	title: 'Statistics',
	...NO_INDEX_PAGE
};

export default function AppPage() {
	return (
		<>
			<h1>Statistics</h1>
			<Statistics />
		</>
	);
}
