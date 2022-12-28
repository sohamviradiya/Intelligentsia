import { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import UserForm from "./pages/UserForm";
import Thread from "./pages/Thread";
import TweetForm from "./pages/TweetForm";
import UserList from "./pages/UserList";
import TweetList from "./pages/Tweetlist";
import { tweetlist, userlist } from "./modules/config";

class Root extends Component {
	constructor(props: any) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<HashRouter>
				<Header />
				<div className="bg-dark p-5 main min-vh-100">
					<Routes>
						<Route path="/" element={<TweetList type={tweetlist.home} />} />
						<Route path="/explore" element={<UserList type={userlist.home} />} />
						<Route path="/user" element={<UserForm />} />
						<Route path="/user/:id" element={<Profile />} >
							<Route path="tweets" element={<TweetList type={tweetlist.authored} />} />
							<Route path="followers" element={<UserList type={userlist.followers} />} />
							<Route path="following" element={<UserList type={userlist.following} />} />
							<Route path="liked" element={<TweetList type={tweetlist.liked} />} />
							<Route path="" element={<Navigate to="tweets" />} />
						</Route>
						<Route path="/tweet" element={<TweetForm />} />
						<Route path="/tweet/:id" element={<Thread />} />
						<Route path="*" element={<Error />} />
					</Routes>
				</div>
			</HashRouter>
		);
	}
}

export default Root;
