'use client';

import { FC } from 'react';

import Loader from '@/components/ui/loader/Loader';

import useProfile from '@/hooks/useProfile';

import styles from './statistics.module.scss';

export const Statistics: FC = () => {
	const { data, isLoading } = useProfile();

	return isLoading ? (
		<Loader />
	) : (
		<div className={styles.container}>
			{data?.statistics.length
				? data.statistics.map((item, idx) => (
						<div
							className={styles.item}
							key={idx}
						>
							<div className={styles.itemLabel}>{item.label}</div>
							<div className={styles.itemValue}>{item.value}</div>
						</div>
					))
				: 'No statistics yet'}
		</div>
	);
};
