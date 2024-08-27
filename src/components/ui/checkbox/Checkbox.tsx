import cn from 'clsx';

import styles from './styles.module.scss';

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

export const Checkbox = ({ id, className, color, ...rest }: ICheckboxProps) => {
	const getClassFromColor = (colorName: string | undefined): string =>
		colorName
			? `input${colorName.charAt(0).toUpperCase()}${colorName.slice(1)}`
			: 'inputDefault';

	return (
		<input
			id={id}
			type='checkbox'
			name='weekly'
			className={cn(styles.input, styles[getClassFromColor(color)], className)}
			{...rest}
		/>
	);
};

export default Checkbox;
