import Link from 'next/link';
import { FC } from 'react';

import { IMenuItem } from '@/components/sidebar/menu.data';

import styles from './menuItem.module.scss';

export const MenuItem: FC<IMenuItem> = ({ name, link, icon: Icon }) => (
	<div>
		<Link
			href={link}
			className={styles.link}
		>
			<Icon />
			{name}
		</Link>
	</div>
);
