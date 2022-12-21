import { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes,Route } from "react-router";
import Home from "./pages/Home";
import User from "./pages/User";
import Error from "./pages/Error";
import UserForm from "./pages/UserForm";
import Tweet from "./pages/Tweet";
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
					<Route path="/user/:id" element={<User />} />
					<Route path="/tweet" element={<TweetForm />} />
					<Route path="/tweet/:id" element={<Tweet />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</HashRouter>
		);
	}
}

export default Root;
