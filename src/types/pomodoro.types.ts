import { IBaseEntity } from '@/types/base.types';

export interface IPomodoroRound extends IBaseEntity {
	isCompleted?: boolean;
	totalSeconds: number;
}

export interface IPomodoroSession extends IBaseEntity {
	isCompleted?: boolean;
	rounds?: IPomodoroRound[];
}

export type PomodoroSessionState = Partial<
	Omit<IPomodoroSession, keyof IBaseEntity>
>;

export type PomodoroRoundState = Partial<
	Omit<IPomodoroRound, keyof IBaseEntity>
>;
