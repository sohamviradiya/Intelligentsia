import { useParams } from "react-router-dom";
function Thread(props: any): JSX.Element {
	const { id } = useParams();
	return <div>Tweet {id}</div>;
}

export default Thread;
