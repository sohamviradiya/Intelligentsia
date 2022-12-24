import { useParams } from "react-router-dom";
function Followers(props: any): JSX.Element {
	const { id } = useParams();
	return <div>Folllowers {id}</div>;
}

export default Followers;
