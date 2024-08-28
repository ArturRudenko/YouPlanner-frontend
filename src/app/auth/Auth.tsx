'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';

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
				<h1 className={styles.title}>YouPlanner</h1>
				<Input
					id={'email'}
					type='email'
					label={'Email:'}
					placeholder={'you@planner.com'}
					{...register('email', {
						required: 'Email is required',
						pattern: {
							value: /^[\w.@+-]+$/,
							message: 'Wrong email format'
						}
					})}
				/>
				<Input
					id={'password'}
					type='password'
					label={'Password:'}
					placeholder={'enter password'}
					{...register('password', {
						required: 'Password is required',
						minLength: {
							value: 6,
							message: 'Password must be at least 6 characters'
						}
					})}
				/>
				<div className={styles.formButtons}>
					<Button onClick={() => setIsLoginFrom(true)}>Login</Button>
					<Button onClick={() => setIsLoginFrom(false)}>Register</Button>
				</div>
			</form>
		</div>
	);
}
