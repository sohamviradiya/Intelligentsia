import { useParams } from "react-router-dom";
function User(props: any): JSX.Element {
	const { id } = useParams();
	return <div>User {id}</div>;
}

export default User;
