import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserInterface } from "../modules/user";
import Loading from "../components/Loading";
import { baseurl } from "../modules/config";
import AuthModule from "../modules/auth";

function Profile(props: any): JSX.Element {
	const { id } = useParams();
	const [user, setUser] = useState<UserInterface>({} as UserInterface);
	const [loading, setLoading] = useState(true);
	const [current, setCurrent] = useState<string>("");
	const [isFollowing, setIsFollowing] = useState<boolean>(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (!id) throw new Error("No id provided");
		fetch(`${baseurl}/users/${id}`).then(res => res.json()).then(data => {
			setUser(data);
			setLoading(false);
		});
		AuthModule.PROFILE().then((data) => {
			setCurrent((data._id) ? data._id : "");
		});
	}, []);

	useEffect(() => {
		fetch(`${baseurl}/users/${id}/followers`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			}
		}).then(res => res.json()).then((data: UserInterface[]) => {
			console.log(current);
			console.log(data.find((user) => (String(user._id) == current)));
			setIsFollowing(data.some((user) => (user._id == current)));
		});
	}, [current]);

	const handleDelete = async () => {
		const res = await fetch(`${baseurl}/users/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		});
		const data = await res.json();
		if (res.status == 200) {
			localStorage.removeItem("token");
			navigate("/");
		} else
			console.log(data);
	};

	const handleFollow = async () => {
		const res = await fetch(`${baseurl}/users/${id}/follow`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		});
		const data = await res.json();
		setIsFollowing(true);
	};

	const handleUnfollow = async () => {
		const res = await fetch(`${baseurl}/users/${id}/follow`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		});
		const data = await res.json();
		setIsFollowing(false);
	};

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
				{(current == user._id) ? (
					<section className="d-flex flex-row p-3 gap-3">
						<NavLink className="btn btn-primary" to="/user">Edit Profile</NavLink>
						<NavLink className="btn btn-primary" to="/tweet">Post Tweet</NavLink>
						<button className="btn btn-danger" onClick={handleDelete}>Delete Account</button>
					</section>) : (
					<section className="d-flex flex-row p-3 gap-3">
						{isFollowing ? (
							<button className="btn btn-danger" onClick={handleUnfollow}>Unfollow</button>
						) : (
							<button className="btn btn-primary" onClick={handleFollow}>Follow</button>
						)}
					</section>
				)
				}
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
