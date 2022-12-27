import { Link } from "react-router-dom";
import { baseurl } from "../modules/config";
import { UserInterface } from "../modules/user";

function User(user: UserInterface): JSX.Element {
	return (
		<div className="card bg-dark border-success">
			<div className="row g-2">
				<div className="col-4 d-flex flex-row align-items-center justify-content-center">
					<img src={`${baseurl}/${user.avatar}`} className="border border-light" height={200} />
				</div>
				<div className="col-8">
					<div className="card-header display-6 d-flex flex-row justify-content-center">
						<Link className="text-decoration-none text-success" to={`/user/${user._id}`}> {user.username} </Link>
					</div>
					<div className="card-body text-success">
						<h3 className="card-title"> {user.firstName} {user.lastName} </h3>

						<p className="card-text"> {user.bio} </p>
					</div>
					<div className="card-footer text-success">
						{new Date(user.joinedAt).toLocaleDateString()}
					</div>
				</div>
			</div>
		</div>
	);
}

export default User;
