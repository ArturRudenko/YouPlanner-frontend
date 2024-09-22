import cn from 'clsx';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { X } from 'lucide-react';
import { FC, useState } from 'react';
import { DayPicker } from 'react-day-picker';

import useOutside from '@/hooks/global/useOutside';

import styles from './datePicker.module.scss';

dayjs.extend(LocalizedFormat);

interface IDatePicker {
	onChange: (value: string) => void;
	value: string;
	position?: 'left' | 'right';
}

export const DatePicker: FC<IDatePicker> = ({
	onChange,
	value,
	position = 'right'
}: IDatePicker) => {
	const [selected, setSelected] = useState<Date>();
	const { show, setShow, ref } = useOutside(false);

	const handleDaySelect = (date: Date): void => {
		const formattedDate = date?.toISOString();

		setSelected(date);
		if (formattedDate) {
			onChange(formattedDate);
			setShow(false);
		} else {
			onChange('');
		}
	};

	return (
		<div
			className={styles.wrapper}
			ref={ref}
		>
			<button onClick={() => setShow(!show)}>
				{value ? dayjs(value).format('LL') : 'Click to select'}
			</button>
			{value && (
				<button
					className={styles.icon}
					onClick={() => onChange('')}
				>
					<X size={14} />
				</button>
			)}
			{show && (
				<div
					className={cn(
						styles.picker,
						position === 'left' ? '-left-4' : ' -right-4'
					)}
					style={{
						top: 'calc(100% + .7rem)'
					}}
				>
					<DayPicker
						required={true}
						startMonth={dayjs().startOf('year').toDate()}
						endMonth={dayjs().add(1, 'year').endOf('year').toDate()}
						autoFocus={show}
						mode='single'
						defaultMonth={selected}
						selected={selected}
						onSelect={handleDaySelect}
						weekStartsOn={1}
						className={styles.rdp}
					/>
				</div>
			)}
		</div>
	);
};
