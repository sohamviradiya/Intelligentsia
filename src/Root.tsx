import { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import UserForm from "./pages/UserForm";
import Thread from "./pages/Thread";
import TweetForm from "./pages/TweetForm";

class Root extends Component {
	constructor(props: any) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<HashRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/user" element={<UserForm />} />
					<Route path="/user/:id" element={<Profile />} />
					<Route path="/tweet" element={<TweetForm />} />
					<Route path="/tweet/:id" element={<Thread />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</HashRouter>
		);
	}
}

export default Root;
