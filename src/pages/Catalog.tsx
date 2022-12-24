import React, { useState, useEffect } from "react";
import User from "../components/User";
function Home(props: any): JSX.Element {
	const [users, setusers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("http://localhost:3000/users")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setusers(data);
				setLoading(false);
			});
	}, []);
	if (loading) return <div>Loading...</div>;
	return (
		<ul>
			{users.map((user: any) => (User(user)))}
		</ul>
	);
}

export default Home;
