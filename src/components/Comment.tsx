import { Link } from "react-router-dom";
import { CommentInterface } from "../modules/comment";
import { baseurl } from "../modules/config";
function Comment(comment: CommentInterface): JSX.Element {
     return (
          <div className="card card-lg bg-dark border-warning">
               <div className="card-header h3 d-flex flex-row justify-content-start">
                    <Link className="text-decoration-none text-warning" to={`/user/${comment.user._id}`}>{comment.user.username}</Link>
               </div>
               <div className="card-body text-warning">
                    <h5 className="card-title"> {comment.content} </h5>
                    <p className="card-text">Likes: {comment.likes.length} </p>
               </div>
               <div className="card-footer text-warning">
                    {new Date(comment.postedAt).toLocaleString()}
               </div>
          </div>
     );
}

export default Comment;
