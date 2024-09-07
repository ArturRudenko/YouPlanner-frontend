import { GanttChartSquare } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import { MENU } from '@/components/sidebar/menu.data';
import { LogoutBtn } from '@/components/ui/logout-btn/LogoutBtn';
import { MenuItem } from '@/components/ui/menu-item/MenuItem';

import { COLORS } from '@/constants/color.constants';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import styles from './sidebar.module.scss';

export const Sidebar: FC = () => (
	<aside className={styles.sidebar}>
		<Link
			href={DASHBOARD_PAGES.HOME}
			className={styles.link}
		>
			<GanttChartSquare
				color={COLORS.primary}
				size={38}
			/>
			<span className={styles.linkText}>YouPlanner</span>
		</Link>
		<div className={styles.menu}>
			<LogoutBtn />
			{MENU.map(item => (
				<MenuItem
					key={item.link}
					name={item.name}
					link={item.link}
					icon={item.icon}
				/>
			))}
		</div>
		<p className={styles.footer}>v1.0</p>
	</aside>
);
