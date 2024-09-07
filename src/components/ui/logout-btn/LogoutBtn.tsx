import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { toast } from 'sonner';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import styles from './logoutBtn.module.scss';
import authService from '@/services/auth.service';

//TODO extract logic to parent

export const LogoutBtn: FC = () => {
	const { push } = useRouter();

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			push(DASHBOARD_PAGES.AUTH);
			toast.success('Logged out successfully!');
		}
	});

	return (
		<div className={styles.wrapper}>
			<button
				className={styles.btn}
				onClick={() => mutate()}
			>
				<LogOut size={20} />
			</button>
		</div>
	);
};
