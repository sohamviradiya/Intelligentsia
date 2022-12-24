import React, { useState, useEffect } from "react";

function Home(props: any): JSX.Element {
	const [tweets, setTweets] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("http://localhost:3000/tweets").then((res) => res.json()).then((data) => {
			console.log(data);
			setTweets(data);
			setLoading(false);
		});
	}, []);
	if (loading) return <div>Loading...</div>;
	return (
		<ul>
			{tweets.map((tweet: any) => (
				<div key={tweet._id}>
					<h4>{tweet.user.firstName} {tweet.user.lastName}</h4>
					<p>{tweet.content}</p>
				</div>
			))}	
		</ul>
	);
}

export default Home;
