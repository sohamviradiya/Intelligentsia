import { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
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
				<Header />
				<div className="mt-5">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/explore" element={<Catalog />} />
						<Route path="/user" element={<UserForm />} />
						<Route path="/user/:id" element={<Profile />} />
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
