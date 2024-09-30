import cn from 'clsx';
import { X } from 'lucide-react';
import { FC } from 'react';

import Tag from '@/components/ui/tag/Tag';

import { EnumTaskPriority, ITag } from '@/types/task.types';

import useOutside from '@/hooks/global/useOutside';

import tagStyles from '../tag.module.scss';

import styles from './tagSelect.module.scss';
import { makeFirstLetterCapital } from '@/helpers';

interface ITagSelect {
	data: ITag[];
	onChange: (priority: EnumTaskPriority | null) => void;
	priority?: EnumTaskPriority | null;
	isColored?: boolean;
}

export const TagSelect: FC<ITagSelect> = ({
	data,
	onChange,
	priority,
	isColored
}) => {
	const { show, setShow, ref } = useOutside(false);

	return (
		<div
			className={cn(styles.select, {
				'w-max': isColored
			})}
			ref={ref}
		>
			<button onClick={() => setShow(!show)}>
				{priority ? (
					<Tag
						text={priority}
						priority={priority}
						className='capitalize'
					/>
				) : (
					<Tag text='Not selected' />
				)}
			</button>
			{priority && (
				<button
					className={styles.cleanBtn}
					onClick={() => onChange(null)}
				>
					<X size={14} />
				</button>
			)}
			{show && (
				<div
					className={styles.listWrapper}
					style={{ top: 'calc(100% + .5rem)' }}
				>
					{data.map((item, idx) => (
						<button
							key={idx + Math.random() * 100}
							onClick={() => {
								onChange(item.priority);
								setShow(false);
							}}
							className={cn(
								styles.listItem,
								tagStyles[
									`tag${priority ? makeFirstLetterCapital(priority) : 'Default'}`
								]
							)}
						>
							<Tag
								text={item.label}
								priority={item.priority}
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
};
