import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { baseurl } from "../modules/config";
import { TweetInterface } from "../modules/tweet";

function TweetForm(props: any): JSX.Element {
	const { id } = useParams();
	const [tweet, setTweet] = useState<TweetInterface>({} as TweetInterface);
	const [errors, setErrors] = useState<string[]>([]);
	const navigate = useNavigate();
	useEffect(() => {
		if (id) {
			fetch(`${baseurl}/tweets/${id}`, {
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => res.json()).then((data) => {
				setTweet(data);
			});
		}
	}, [id]);


	const submittweet = async (tweet: TweetInterface) => {

		const res = (tweet.user) ? fetch(`${baseurl}/tweets`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ title: tweet.title, content: tweet.content }),
		}) : fetch(`${baseurl}/tweets/${tweet._id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({ title: tweet.title, content: tweet.content }),
		});
		const data = await (await res).json();
		if (data.statusCode === 400) {
			setErrors([data.message]);
		} else if (data.statusCode === 412) {
			setErrors(data.message);
		} else {
			navigate(`/tweet/${data._id}`);
		}
	};


	return (
		<>
			<form onSubmit={(e) => e.preventDefault()}>
				<div className="form-floating mb-3">
					<input required type="text" className="form-control" value={tweet.title} onChange={(e) => { setTweet({ ...tweet, title: e.target.value }) }} id="titleinput" placeholder="title" />
					<label htmlFor="titleinput">Title</label>
				</div>
				<div className="form-floating mb-3">
					<textarea rows={4} className="form-control" value={tweet.content} onChange={(e) => { setTweet({ ...tweet, content: e.target.value }) }} id="contentinput" placeholder="content" />
					<label htmlFor="contentinput">Content</label>
				</div>
				<button className="btn btn-primary" onClick={() => submittweet(tweet)}>Submit</button>
			</form>
			{(errors.length > 0) ? (
				<div className="alert alert-danger" role="alert">
					<ul>
						{errors.map((error, index) => (<li key={index}>{error}</li>))}
					</ul>
				</div>) : (<></>)}
		</>
	);
}

export default TweetForm;
