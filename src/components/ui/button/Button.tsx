import cn from 'clsx';
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

import styles from './button.module.scss';

const Button: FC<
	PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ children, className, ...rest }) => (
	<button
		className={cn(styles.button, className)}
		{...rest}
	>
		{children}
	</button>
);

export default Button;
