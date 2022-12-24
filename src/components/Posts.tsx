import { useParams } from "react-router-dom";
function Posts(props: any): JSX.Element {
	const { id } = useParams();
	return <div>Tweets of {id}</div>;
}

export default Posts;
