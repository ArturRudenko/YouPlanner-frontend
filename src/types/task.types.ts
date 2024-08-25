import { IBaseEntity } from '@/types/base.types';

export enum EnumTaskPriority {
	low = low,
	medium = medium,
	high = high
}

export interface ITask extends IBaseEntity {
	name: string;
	priority?: EnumTaskPriority;
	isCompleted: boolean;
}

export type TaskFormStat = Partial<Omit<ITask, 'id' | 'updatedAt'>>;
