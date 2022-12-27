import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userlist } from "../modules/config";
import { baseurl } from "../modules/config";
import { UserInterface } from "../modules/user";
import User from "../components/User";
import Loading from "../components/Loading";
function UserList(props: any): JSX.Element {
	const { id } = useParams<{ id: string }>();
	const [users, setUsers] = useState<UserInterface[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (props.type == userlist.home) {
			fetch("${baseurl}/users/")
				.then((res) => res.json())
				.then((data: UserInterface[]) => {
					setUsers(data);
					setLoading(false);
				});
		}
		else if (props.type == userlist.followers) {
			fetch(`${baseurl}/users/${id}/followers/`).then((res) => (res.json())).then((data: UserInterface[]) => {
				setUsers(data);
				setLoading(false);
			});
		} else if (props.type == userlist.following) {
			fetch(`${baseurl}/users/${id}/`).then((res) => (res.json())).then((data: UserInterface) => {
				setUsers(data.following);
				setLoading(false);
			});
		} else {
			setUsers([]);
			setLoading(false);
		}
	}, [id, props.type]);
	return (
		<>
			{(loading) ?
				<Loading />
				: (
					<ul className="container w-75 p-5">
						{users.map((user: any) => (
							<li key={`${user._id}`} className="mb-5">
								{User(user)}
							</li>
						))}
					</ul>
				)
			}
		</>
	);
}

export default UserList;
