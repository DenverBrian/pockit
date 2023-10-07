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
