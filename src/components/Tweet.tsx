import { Link } from "react-router-dom";
import { TweetInterface } from "../modules/tweet";
import { baseurl } from "../modules/config";
import { useEffect } from "react";
function Tweet(tweet: TweetInterface): JSX.Element {
	return (
		<div className="card bg-dark border-primary">
			<div className="row g-2">
				<div className="col-4 d-flex flex-row align-items-center justify-content-center">
					<img src={`${baseurl}/${tweet.user.avatar}`} className="border border-info" height={220} />
				</div>
				<div className="col-8">
					<div className="card-header h2 d-flex flex-row justify-content-start">
						<Link className="card-title display-6 text-decoration-none text-primary" to={`tweet/${tweet._id}`}> {tweet.title} </Link>
					</div>
					<div className="card-body text-primary">
						<Link className="text-decoration-none h2" to={`/user/${tweet.user._id}`}>{tweet.user.username}</Link>
						<p className="card-text h5 mt-3"> {tweet.content} </p>
						<p className="card-text">Likes: {tweet.likes.length} </p>
					</div>
					<div className="card-footer text-primary">
						{new Date(tweet.postedAt).toLocaleString()}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Tweet;
