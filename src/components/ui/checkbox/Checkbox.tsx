import cn from 'clsx';

import styles from './styles.module.scss';
import { makeFirstLetterCapital } from '@/helpers';

interface ICheckboxProps {
	id?: string;
	className?: string;
	color?:
		| 'red'
		| 'blue'
		| 'green'
		| 'yellow'
		| 'orange'
		| 'teal'
		| 'navy'
		| 'lime'
		| 'cyan'
		| 'pink'
		| 'purple'
		| 'amber'
		| 'indigo'
		| 'gray';
	[x: string]: any;
}

export const Checkbox = ({ id, className, color, ...rest }: ICheckboxProps) => (
	<input
		id={id}
		type='checkbox'
		name='weekly'
		className={cn(
			styles.input,
			styles[`input${color ? makeFirstLetterCapital(color) : 'Default'}`],
			className
		)}
		{...rest}
	/>
);

export default Checkbox;
