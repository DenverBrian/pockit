export type User = {
	id: string;
	name: string;
	email: string;
	username: string;
	avatar: string;
};

export type RegisterUser = Omit<User, 'id'> & {
	password: string;
	passwordConfirm: string;
};

export type LoginUser = {
	identity: string;
	password: string;
};

export type TaskStatus = 'todo' | 'inProgress' | 'done';

export type Task = {
	id: string;
	owner: string;
	created: Date;
	updated: Date;
	description: string;
	status: TaskStatus;
};
