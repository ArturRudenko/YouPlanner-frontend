import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Settings } from '@/containers/settings/Settings';

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
};

export default function SettingsPage() {
	return (
		<>
			<h1>Settings</h1>
			<Settings />
		</>
	);
}
