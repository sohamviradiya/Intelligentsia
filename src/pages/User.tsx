import { Component } from "react";
import { useParams } from "react-router-dom";
function User(props: any) {
	const { id } = useParams();
	return <div>User {id}</div>;
}

export default User;
