import { Link, useNavigate } from "react-router-dom";
import { CommentInterface } from "../modules/comment";
import { baseurl } from "../modules/config";
import { useEffect, useState } from "react";
import { AuthInterface } from "../modules/auth";
import AuthModule from "../modules/auth";
function Comment(comment: CommentInterface, current: string, setComments: Function, comments: CommentInterface[]): JSX.Element {
     const handleDelete = async () => {
          const res = await fetch(`${baseurl}/comments/${comment._id}`, {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
               },
          });
          const data = await res.json();
          if (res.status === 200) {
               setComments(comments.filter((c) => c._id !== comment._id));
          }
     }

     const handleLike = async () => {
          const res = await fetch(`${baseurl}/comments/${comment._id}/like`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
               }
          });
          const data = await res.json();
          setComments(comments.map((c) => (c._id === comment._id) ? data : c));
     };

     const handleUnlike = async () => {
          const res = await fetch(`${baseurl}/comments/${comment._id}/like`, {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
               }
          });
          const data = await res.json();
          setComments(comments.map((c) => (c._id === comment._id) ? data : c));
     };

          
     return (
          <div className="card card-lg bg-dark border-warning">
               <div className="card-header h3 d-flex flex-row justify-content-start">
                    <Link className="text-decoration-none text-warning" to={`/user/${comment.user._id}`}>{comment.user.username}</Link>
               </div>
               <div className="card-body text-warning">
                    <h5 className="card-title"> {comment.content} </h5>
                    <p className="card-text">Likes: {comment.likes.length} </p>
                    {(current === comment.user._id) && <button className="btn btn-danger" onClick={handleDelete}>Delete</button>}
                    
                    {(current.length) ?
                         (comment.likes.some((user) => (String(user._id) == current))
                              ? <button className="btn btn-warning" onClick={handleUnlike}>Unlike</button>
                              : <button className="btn btn-warning" onClick={handleLike}>Like</button>)
                         : (<></>)}
               </div>
               <div className="card-footer text-warning">
                    {new Date(comment.postedAt).toLocaleString()}
               </div>
          </div>
     );
}

export default Comment;
