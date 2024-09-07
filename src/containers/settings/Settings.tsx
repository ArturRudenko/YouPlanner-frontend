'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';

import { UserFormData } from '@/types/auth.types';

import useProfile from '@/hooks/useProfile';

import styles from './settings.module.scss';
import userService from '@/services/user.service';

export const Settings: FC = () => {
	const { data: profile, refetch: refetchProfile } = useProfile();

	const { register, handleSubmit, reset, setValue } = useForm<UserFormData>({
		mode: 'onChange'
	});

	const QueryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: UserFormData) => userService.update(data),
		onSuccess: () => {
			QueryClient.invalidateQueries({ queryKey: ['profile'] })
				.then(() => refetchProfile())
				.then(res => {
					reset({
						email: res.data?.user.email,
						name: res.data?.user.name,
						workInterval: res.data?.user.workInterval,
						breakInterval: res.data?.user.breakInterval,
						intervalsCount: res.data?.user.intervalsCount
					});
					toast.success('Updated successfully');
				});
		}
	});

	const onSubmit: SubmitHandler<UserFormData> = data => {
		const { password, ...rest } = data;

		mutate({
			...rest,
			password: password || undefined
		});
	};

	useEffect(() => {
		setValue('email', profile?.user.email || '');
		setValue('name', profile?.user.name || '');
		setValue('workInterval', profile?.user.workInterval || 50);
		setValue('breakInterval', profile?.user.breakInterval || 10);
		setValue('intervalsCount', profile?.user.intervalsCount || 7);
	});

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div>
				<div>
					<Input
						id='email'
						label='Email: '
						type='email'
						placeholder={'you@planner.com'}
						className='mb-4'
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[\w.@+-]+$/,
								message: 'Wrong email format'
							}
						})}
					/>

					<Input
						id='name'
						label='Name: '
						placeholder='Dude '
						className='mb-4'
						{...register('name', {
							minLength: {
								value: 2,
								message: 'Name should be at least 2 characters'
							}
						})}
					/>

					<Input
						id='password'
						label='Password: '
						placeholder='12awLA9! '
						type='password'
						className='mb-4'
						{...register('password', {
							minLength: {
								value: 6,
								message: 'Password must be at least 6 characters'
							}
						})}
					/>
				</div>

				<div>
					<Input
						id='workInterval'
						label='Work interval (min.): '
						placeholder='50'
						isNumber
						className='mb-4'
						{...register('workInterval', {
							valueAsNumber: true
						})}
					/>

					<Input
						id='breakInterval'
						label='Break interval (min.): '
						placeholder='10'
						isNumber
						className='mb-4'
						{...register('breakInterval', {
							valueAsNumber: true
						})}
					/>

					<Input
						id='intervalsCount'
						label='Intervals count (max 10): '
						placeholder='7'
						isNumber
						className='mb-4'
						{...register('intervalsCount', {
							valueAsNumber: true,
							max: 10
						})}
					/>
				</div>
			</div>

			<Button
				type='submit'
				disabled={isPending}
			>
				Save
			</Button>
		</form>
	);
};
