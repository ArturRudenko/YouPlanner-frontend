import cn from 'clsx';
import { FC, KeyboardEvent, forwardRef } from 'react';

import styles from './styles.module.scss';

interface InputProps {
	id: string;
	label: string;
	className?: string;
	placeholder?: string;
	variant?: string;
	state?: 'error' | 'success';
	type?: string;
	disabled: boolean;
	isNumber?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			id,
			label,
			className,
			placeholder,
			state,
			type,
			disabled,
			isNumber,
			...rest
		},
		ref
	) => {
		const handleKeyEvents = (event: KeyboardEvent): void => {
			if (
				isNumber &&
				!/[0-9]/.test(event.key) &&
				event.key !== 'Backspace' &&
				event.key !== 'Tab' &&
				event.key !== 'Enter' &&
				event.key !== 'ArrowLeft' &&
				event.key !== 'ArrowRight'
			) {
				event.preventDefault();
			}
		};

		return (
			<div className={className}>
				<label
					htmlFor={id}
					className={styles.label}
				></label>
				<input
					id={id}
					ref={ref}
					disabled={disabled}
					type={type}
					placeholder={placeholder}
					className={cn(
						styles.input,
						disabled && styles.inputDisabled,
						state === 'error' && styles.inputError,
						state === 'success' && styles.inputSuccess
					)}
					onKeyDown={handleKeyEvents}
					{...rest}
				/>
			</div>
		);
	}
);

Input.displayName = 'input';
