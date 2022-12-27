import { TweetInterface } from "./tweet";
import { baseurl } from "./config";
import { UserInterface } from "./user";

export type CommentInterface = {
	_id: string;
	user: UserInterface;
	tweet: TweetInterface;
	content: string;
	likes: UserInterface[];
};

const CommentModule = (() => {
	const CREATE = async (
		comment: CommentInterface,
		tweet: string
	): Promise<CommentInterface> => {
		const token = localStorage.getItem("token");
		const response = await fetch(`${baseurl}/comments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ content: comment.content, tweet: tweet }),
		});
		const data = await response.json();
		if (!data._id) throw new Error("Unable to create comment");
		comment._id = data._id;
		return comment;
	};

	const READ = async (id: string): Promise<CommentInterface> => {
		const response = await fetch(`${baseurl}/comments/${id}`);
		const data = await response.json();
		if (!data._id) throw new Error("Unable to read comment");
		return data;
	};

	const UPDATE = async (
		comment: CommentInterface
	): Promise<CommentInterface> => {
		const token = localStorage.getItem("token");
		const response = await fetch(`${baseurl}/comments/${comment._id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ content: comment.content }),
		});

		const data = await response.json();
		if (!data._id) throw new Error("Unable to update comment");
		return data;
	};

	const DELETE = async (id: string): Promise<CommentInterface> => {
		const token = localStorage.getItem("token");
		const response = await fetch(`${baseurl}/comments/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		if (!data._id) throw new Error("Unable to delete comment");
		return {} as CommentInterface;
	};
	return {
		CREATE,
		READ,
		UPDATE,
		DELETE,
	};
})();

export default CommentModule;
