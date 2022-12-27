import { TweetInterface } from "./tweet";
import { baseurl } from "./config";
import { UserInterface } from "./user";

export type CommentInterface = {
	_id: string;
	user: UserInterface;
	tweet: TweetInterface;
	content: string;
	postedAt: Date;
	likes: UserInterface[];
};
