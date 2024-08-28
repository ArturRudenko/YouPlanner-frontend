import cn from 'clsx';
import { CSSProperties, FC } from 'react';

import { EnumTaskPriority } from '@/types/task.types';

import styles from './styles.module.scss';
import { makeFirstLetterCapital } from '@/helpers';

interface ITag {
	text: string;
	priority?: EnumTaskPriority;
	className?: string;
	style?: CSSProperties;
}

const Tag: FC<ITag> = ({ text, priority, className, style }) => (
	<span
		className={cn(
			styles.tag,
			styles[`tag${priority ? makeFirstLetterCapital(priority) : 'Default'}`],
			className
		)}
		style={style}
	>
		{text}
	</span>
);

export default Tag;
