import { UserInterface } from "./user";
import { baseurl } from "./config";

export type TweetInterface = {
	_id: string;
	user: UserInterface;
	title: string;
	content: string;
	likes: UserInterface[];
	postedAt: Date;
};
