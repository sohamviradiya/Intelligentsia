import { NavLink, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserInterface } from "../modules/user";
import Loading from "../components/Loading";
import { baseurl } from "../modules/config";

function Profile(props: any): JSX.Element {
	const { id } = useParams();
	const [user, setUser] = useState<UserInterface>({} as UserInterface);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!id) throw new Error("No id provided");
		fetch(`${baseurl}/users/${id}`).then(res => res.json()).then(data => {
			setUser(data);
			setLoading(false);
		});
	}, []);

	return (
		loading ? <Loading /> :
			<>
				<section className="container container-fluid">
					<div className="row">
						<div className="col-4">
							<img src={`${baseurl}/${user.avatar}`} className="border border-light" height={220} alt="..." />
						</div>
						<div className="col-8 border border-success p-3 text-bg-dark d-flex flex-column justify-content-evenly">
							<h3 className="display-4"> {user.firstName} {user.lastName} </h3>
							<h4 className="display-6"> {user.username} </h4>
							<h5 className="h3"> {user.email} </h5>
							<h6 className="h4"> @{user.country} </h6>
							<p className="h5"> {user.bio} </p>
							<p className="h6"> Joined: {new Date(user.joinedAt).toLocaleDateString()} </p>
						</div>
					</div>
				</section>
				<section className="mt-5 min-vh-100">
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<NavLink className="nav-link" to="tweets"><span className="h4 px-2">Tweets</span></NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="followers"><span className="h4 px-2">Followers</span></NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="following"><span className="h4 px-2">Following</span></NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="liked"><span className="h4 px-2">Likes</span></NavLink>
						</li>
					</ul>
					<Outlet />
				</section>
			</>
	);
}

export default Profile;
