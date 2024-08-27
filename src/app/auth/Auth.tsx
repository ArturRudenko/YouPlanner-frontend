'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { IAuthForm } from '@/types/auth.types';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import styles from './styles.module.scss';
import authService from '@/services/auth.service';

export function Auth() {
	const [isLoginFrom, setIsLoginFrom] = useState(false);

	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	});

	const { push } = useRouter();

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.authorize(isLoginFrom ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Authorized successfully!');
			reset();
			push(DASHBOARD_PAGES.HOME);
		}
	});

	const onSubmit: SubmitHandler<IAuthForm> = data => mutate(data);

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				HEADING INPUTS
				<div className={styles.formContent}>BUTTONS</div>
			</form>
		</div>
	);
}
