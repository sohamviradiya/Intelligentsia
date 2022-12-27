import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TweetInterface } from "../modules/tweet";
import { baseurl } from "../modules/config";
import Comment from "../components/Comment";
import { CommentInterface } from "../modules/comment";
import Tweet from "../components/Tweet";
import Loading from "../components/Loading";

function Thread(props: any): JSX.Element {
	const { id } = useParams();
	const [tweet, setTweet] = useState<TweetInterface>({} as TweetInterface);
	const [comments, setComments] = useState<CommentInterface[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!id) throw new Error("No id provided");
		fetch(`${baseurl}/tweets/${id}`).then((res) => {
			res.json().then((data: TweetInterface) => {
				setTweet(data);
				setLoading(false);
			});
		});
		fetch(`${baseurl}/tweets/${id}/comments`).then((res) => {
			res.json().then((data: CommentInterface[]) => {
				setComments(data);
			});
		});
	}, [id]);

	return (
		(loading) ?
			<Loading /> :
			(<>
				<section className="container container-fluid">
					{Tweet(tweet)}
				</section>
				<section className="container container-fluid">
					<ul className="container w-75 p-5">
						{comments.map((comment) => (
							<li key={`${comment._id}`} className="mb-5">
								{Comment(comment)}
							</li>
						))}
					</ul>
				</section>
			</>)
	);
}

export default Thread;
