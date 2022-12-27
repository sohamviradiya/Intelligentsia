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
	avatar: File | null;
	joinedAt: Date;
};

const UserModule = (() => {
	const CREATE = async (user: UserInterface): Promise<UserInterface> => {
		const response = await fetch(`${baseurl}/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const data = await response.json();
		if (!data._id) throw new Error("Unable to create user");
		return data;
	};

	const READ = async (id: string): Promise<UserInterface> => {
		const response = await fetch(`${baseurl}/users/${id}`);
		const data = await response.json();
		if (!data._id) throw new Error("Unable to read user");
		return data;
	};

	const UPDATE = async (user: UserInterface): Promise<UserInterface> => {
		const token = localStorage.getItem("token");
		if (!token) throw new Error("Invalid authorization token");
		const response = await fetch(`${baseurl}/users`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(user),
		});
		const data = await response.json();
		if (!data._id) throw new Error("Unable to update user");
		return data;
	};

	const DELETE = async (id: string): Promise<UserInterface> => {
		const token = localStorage.getItem("token");
		if (!token) throw new Error("Invalid authorization token");
		const response = await fetch(`${baseurl}/users`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		if (!data._id) throw new Error("Unable to delete user");
		return {} as UserInterface;
	};

	return {
		CREATE,
		READ,
		UPDATE,
		DELETE,
	};
})();

export default UserModule;
