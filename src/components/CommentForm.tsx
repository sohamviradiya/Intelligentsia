import { useEffect, useState } from "react";
import { CommentInterface } from "../modules/comment";
import { baseurl } from "../modules/config";
import { useNavigate } from "react-router-dom";
function CommentForm(props: any): JSX.Element {
	const [comment, setComment] = useState<CommentInterface>({} as CommentInterface);
	const navigate = useNavigate();

	useEffect(() => {
		setComment(props.comment);
	}, [props]);


	const submitcomment = async (comment: CommentInterface) => {
		
		const res = (comment._id) ? fetch(`${baseurl}/comments/${comment._id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ content: comment.content, tweet: props._id })
		}) : fetch(`${baseurl}/comments/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ content: comment.content, tweet: props._id})
		});
		const data = await (await res).json();
		console.log(data);
	}
	return (<>

		<form className="container w-50 p-5" onSubmit={(e) => e.preventDefault()}>
			<div className="form-floating mb-3">
				<textarea rows={4} className="form-control" value={comment.content} onChange={(e) => { setComment({ ...comment, content: e.target.value }) }} id="contentinput" placeholder="content" />
				<label htmlFor="contentinput">Post Comment</label>
			</div>
			<button className="btn btn-primary" onClick={() => submitcomment(comment)}>Submit</button>
		</form>
	</>);
}

export default CommentForm;
