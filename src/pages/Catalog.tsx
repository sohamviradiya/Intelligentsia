import React, { useState, useEffect } from "react";
import User from "../components/User";
function Home(props: any): JSX.Element {
	const [users, setusers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("http://localhost:3000/users")
			.then((res) => res.json())
			.then((data) => {
				setusers(data);
				setLoading(false);
			});
	}, []);
	if (loading) return <div>Loading...</div>;
	return (
		<ul className="list-group bg-dark text-bg-dark p-5 d-flex flex-column">
			{users.map((user: any) => (
				<li key={`${user._id}`} className="m-3 p-3 list-group-item-dark rounded-2">
					{User(user)}
				</li>
			))}
		</ul>
	);
}

export default Home;
