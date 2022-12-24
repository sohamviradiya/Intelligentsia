import { useParams } from "react-router-dom";
function Profile(props: any): JSX.Element {
	const { id } = useParams();
	fetch("http://localhost:3000/users/" + id)
		.then((res) => res.json())
		.then((data) => console.log("user:", data));
	fetch("http://localhost:3000/users/" + id + "/tweets")
		.then((res) => res.json())
		.then((data) => console.log("tweets:", data));

	return <div>User {id}</div>;
}

export default Profile;
