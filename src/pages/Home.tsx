function Home(props: any): JSX.Element {
	fetch("http://localhost:3000/users", {
		headers: {
			"Content-Type": "application/json",
		},
	}).then((response: any) => response.json())
		.then((users: any) => {
			console.log(users);
		});
	return <div>Home</div>;
}

export default Home;
