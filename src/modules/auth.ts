import Profile from "../pages/Profile";
import { baseurl } from "./config";

export type AuthInterface = {
	token: string | null;
	username: string | null;
	_id: string | null;
};

const AuthModule = (() => {
	const LOGIN = async (
		username: string,
		password: string
	): Promise<AuthInterface> => {
		const response = await fetch(`${baseurl}/auth/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});
		if (response.status === 401) alert("Invalid credentials");
		const data = await response.json();
		if (!data.access_token) throw new Error("Unable to login");
		localStorage.setItem("token", data.access_token);
		return PROFILE();
	}
	const PROFILE = async (): Promise<AuthInterface> => {
		const token = localStorage.getItem("token");
		if (!token) return { token: null, username: null, _id: null };
		const response = await fetch(`${baseurl}/auth/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		if (!data._id) throw new Error("Unable to get profile");
		return { token: token, username: data.username, _id: data._id };
	};

	const LOGOUT = async (): Promise<AuthInterface> => {
		const token = localStorage.getItem("token");
		const response = await fetch(`${baseurl}/auth/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		if (!response.ok) throw new Error("Unable to logout");

		localStorage.removeItem("token");
		return { token: null, username: null, _id: null };
	};

	return {
		LOGIN,
		LOGOUT,
		PROFILE,
	};
})();

export default AuthModule;
