import { useParams, Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TweetInterface } from "../modules/tweet";
import { baseurl } from "../modules/config";
import Comment from "../components/Comment";
import { CommentInterface } from "../modules/comment";
import Loading from "../components/Loading";
import AuthModule from "../modules/auth";
import CommentForm from "../components/CommentForm";
function Thread(props: any): JSX.Element {
	const { id } = useParams();
	const [tweet, setTweet] = useState<TweetInterface>({} as TweetInterface);
	const [comments, setComments] = useState<CommentInterface[]>([]);
	const [loading, setLoading] = useState(true);
	const [current, setCurrent] = useState<string>("");
	const [comment, setComment] = useState<CommentInterface>({} as CommentInterface);
	const navigate = useNavigate();

	useEffect(() => {
		if (!id) throw new Error("No id provided");
		fetch(`${baseurl}/tweets/${id}`)
			.then((res) => (res.json()))
			.then((data: TweetInterface) => {
				setTweet(data);
				setLoading(false);
				return data;
			});

		AuthModule.PROFILE().then((data) => {
			setCurrent((data._id) ? data._id : "");
		});
		fetch(`${baseurl}/tweets/${id}/comments`).then((res) => {
			res.json().then((data: CommentInterface[]) => {
				setComments(data);
			});
		});

	}, [id]);

	const handleDelete = async () => {
		const res = await fetch(`${baseurl}/tweets/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		});
		const data = await res.json();
		navigate("/");
	};

	const handleLike = async () => {
		const res = await fetch(`${baseurl}/tweets/${id}/like`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		});
		const data = await res.json();
		setTweet(data);
	};

	const handleUnlike = async () => {
		const res = await fetch(`${baseurl}/tweets/${id}/like`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		});
		const data = await res.json();
		setTweet(data);
	};


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
				{(tweet.user._id == current) ? (
					<section className="d-flex flex-row p-3 gap-3">
						<NavLink className="btn btn-primary" to="edit">Edit Tweet</NavLink>
						<button className="btn btn-danger" onClick={handleDelete}>Delete Tweet</button>
					</section>) : (<section className="d-flex flex-column align-items-center p-3 gap-2">
						{(current.length) ?
							(<>
								{(tweet.likes.some((user) => (user._id == current))
									? <button className="btn btn-primary" onClick={handleUnlike}>Unlike</button>
									: <button className="btn btn-primary" onClick={handleLike}>Like</button>)
								}
								<CommentForm _id={id} comment={comment} />
							</>) : <></>}

					</section>)
				}
				<section className="container container-fluid">
					<ul className="container w-75 p-5">
						{comments.map((comment) => (
							<li key={`${comment._id}`} className="mb-5">
								{Comment(comment, current, setComments, comments, setComment)}
							</li>
						))}
					</ul>
				</section>
			</>)
	);
}

export default Thread;
