import { IBaseEntity } from '@/types/base.types';

export interface ITimeslot extends IBaseEntity {
	name: string;
	color?: string;
	duration: number;
	order: string;
}

export type TimeslotFormState = Partial<
	Omit<ITimeslot, 'createdAt' | 'updatedAt'>
>;
