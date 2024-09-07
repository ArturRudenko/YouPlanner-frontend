'use client';

import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

import { Header } from '@/components/header/Header';
import { Sidebar } from '@/components/sidebar/Sidebar';
import Loader from '@/components/ui/loader/Loader';

import styles from './appLayout.module.scss';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
	const isMutating = useIsMutating();
	const isFetching = useIsFetching();

	return (
		<>
			{!!(isFetching || isMutating) && (
				<div className={styles.loader}>
					<Loader />
				</div>
			)}
			<div className={styles.layout}>
				<Sidebar />

				<div className={styles.layoutContent}>
					<Header />
					{children}
				</div>
			</div>
		</>
	);
};
