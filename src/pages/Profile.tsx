import { NavLink, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserModule, { UserInterface } from "../modules/user";

import { baseurl } from "../modules/config";

function Profile(props: any): JSX.Element {
	const { id } = useParams();
	const [user, setUser] = useState<UserInterface>({} as UserInterface);
	useEffect(() => {
		if (!id) throw new Error("No id provided");
		UserModule.READ(id)
			.then((data: UserInterface) => {
				setUser(data);
			})
			.catch((err: Error) => {
				alert(err);
			});
	}, []);

	return (
		<>
			<section className="container container-fluid">
				<div className="row">
					<div className="col">
						<img src={`${baseurl}/${user.avatar}`} className="border border-light" height={220} alt="..." />
					</div>
					<div className="col border border-success p-3 text-bg-dark d-flex flex-column justify-content-evenly">
						<h3 className="display-6"> {user.firstName} {user.lastName} </h3>
						<h4 className="h3"> {user.username} </h4>
						<h5 className="h3"> {user.email} </h5>
						<h6 className="h4"> @{user.country} </h6>
						<p className="h5"> {user.bio} </p>
					</div>
				</div>
			</section>
			<section className="container container-fluid mt-5 p-5">
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
				<Outlet/>
			</section>
		</>
	);
}

export default Profile;
