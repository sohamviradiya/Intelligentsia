import { baseurl } from "./config";

export type UserInterface = {
	_id: string | null;
	username: string | null;
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	country: string | null;
	following: UserInterface[];
	bio: string | null;
	avatar: string | null;
	joinedAt: Date;
};

