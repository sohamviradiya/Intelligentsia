import { Link } from "react-router-dom";
import { TweetInterface } from "../modules/tweet";
import { baseurl } from "../modules/config";
function Tweet(tweet: TweetInterface): JSX.Element {
	return (
		<div className="card bg-dark border-primary">
			<div className="row g-2">
				<div className="col-4 px-3 py-3">
					<img src={`${baseurl}/${tweet.user.avatar}`} className="border border-info" height={220} />
				</div>
				<div className="col-8">
					<div className="card-header display-6 d-flex flex-row justify-content-start">
						<Link className="text-decoration-none" to={`/user/${tweet.user._id}`}>{tweet.user.username}</Link>
					</div>
					<div className="card-body text-primary">
						<h5 className="card-title"> {tweet.title} </h5>
						<p className="card-text"> {tweet.content} </p>
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
