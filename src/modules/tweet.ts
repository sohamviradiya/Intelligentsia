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

const TweetModule = (() => {
	const CREATE = async (tweet: TweetInterface): Promise<TweetInterface> => {
		const token = localStorage.getItem("token");
		const response = await fetch(`${baseurl}/tweets`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ content: tweet.content }),
		});
		const data = await response.json();
		if (!data._id) throw new Error("Error creating tweet");
		tweet._id = data._id;
		return tweet;
	};

	const READ = async (id: string): Promise<TweetInterface> => {
		const response = await fetch(`${baseurl}/tweets/${id}`);
		const data = await response.json();
		if (!data._id) throw new Error("Error reading tweet");
		return data;
	};

	const READ_ALL = async (): Promise<TweetInterface[]> => {
		const response = await fetch(`${baseurl}/tweets`);
		const data = await response.json();
		if (!data[0]._id) throw new Error("Error reading tweets");
		return data;
	};

	const UPDATE = async (tweet: TweetInterface): Promise<TweetInterface> => {
		const token = localStorage.getItem("token");
		const response = await fetch(`${baseurl}/tweets/${tweet._id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ content: tweet.content }),
		});
		const data = await response.json();
		if (!data._id) throw new Error("Error updating tweet");
		return data;
	};

	const DELETE = async (id: string): Promise<TweetInterface> => {
		const token = localStorage.getItem("token");
		const response = await fetch(`${baseurl}/tweets/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		if (response.status !== 200) throw new Error("Error deleting tweet");
		return {} as TweetInterface;
	};

	return {
		CREATE,
		READ,
		UPDATE,
		DELETE,
		READ_ALL,
	};
})();

export default TweetModule;
