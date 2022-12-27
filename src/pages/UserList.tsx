import { useParams } from "react-router-dom";
import { userlist } from "../modules/config";
function UserList(props: any): JSX.Element {
	if (props.type == userlist.followers) {
		return (
			<div>
				<h1>Followers</h1>
			</div>
		);
	} else {
		return (
			<div>
				<h1>Following</h1>
			</div>
		);
	}
}

export default UserList;
