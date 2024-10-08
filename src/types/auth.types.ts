export interface IAuthForm {
	email: string;
	password: string;
}

export interface IUser {
	id: number;
	name?: string;
	email: string;

	workInterval?: number;
	breakInterval?: number;
	intervalsCount?: number;
}

export interface IAuthResponse {
	user: IUser;
	accessToken: string;
}

export type UserFormData = Omit<IUser, 'id'> & { password?: string };
