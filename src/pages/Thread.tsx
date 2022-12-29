import { useParams, Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { TweetInterface } from "../modules/tweet";
import { baseurl } from "../modules/config";
import Comment from "../components/Comment";
import { CommentInterface } from "../modules/comment";
import Loading from "../components/Loading";
import AuthModule from "../modules/auth";
function Thread(props: any): JSX.Element {
	const { id } = useParams();
	const [tweet, setTweet] = useState<TweetInterface>({} as TweetInterface);
	const [comments, setComments] = useState<CommentInterface[]>([]);
	const [loading, setLoading] = useState(true);
	const [self, setSelf] = useState(false);
	useEffect(() => {
		if (!id) throw new Error("No id provided");
		fetch(`${baseurl}/tweets/${id}`)
			.then((res) => (res.json()))
			.then((data: TweetInterface) => {
				setTweet(data);
				setLoading(false);
				return data;
			})
			.then((tweet) => {
				AuthModule.PROFILE().then((data) => {
					if (data._id == tweet.user._id) setSelf(true);					
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
					<div className="row">
						<div className="col-4">
							<img src={`${baseurl}/${tweet.user.avatar}`} className="border border-light" height={220} alt="..." />
						</div>
						<div className="col-8 border border-primary p-3 text-bg-dark d-flex flex-column justify-content-evenly">
							<h3 className="display-4"> {tweet.title} </h3>
							<Link className="display-6" to={`/user/${tweet.user._id}`}> {tweet.user.username}  </Link>
							<h5 className="h3"> {tweet.content} </h5>
							<h6 className="h4"> Likes: {tweet.likes.length} </h6>
							<p className="h5"> {new Date(tweet.postedAt).toLocaleString()} </p>
						</div>
					</div>
				</section>
				{(self) ? (
					<section className="d-flex flex-row p-3 gap-3">
						<NavLink className="btn btn-primary" to="edit">Edit Tweet</NavLink>
					</section>) : (<></>)
				}
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
