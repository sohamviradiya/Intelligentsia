import { TweetInterface } from "./tweet";
import { UserInterface } from "./user";

export type CommentInterface = {
	_id: string;
	user: UserInterface;
	tweet: TweetInterface;
	content: string;
	postedAt: Date;
	likes: UserInterface[];
};
