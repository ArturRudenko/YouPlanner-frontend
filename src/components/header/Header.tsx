import { FC } from 'react';

import Loader from '@/components/ui/loader/Loader';

import useProfile from '@/hooks/auth/useProfile';

import styles from './header.module.scss';

export const Header: FC = () => {
	const { data, isLoading } = useProfile();

	return (
		<header className={styles.container}>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.user}>
					<div className={styles.userInfo}>
						<p className={styles.userName}>{data?.user.name}</p>
						<p className={styles.userEmail}>{data?.user.email}</p>
					</div>

					<div className={styles.userAvatar}>
						{data?.user.name?.charAt(0) || 'A'}
					</div>
				</div>
			)}
		</header>
	);
};
