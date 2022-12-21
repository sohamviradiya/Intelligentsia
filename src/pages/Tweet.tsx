import { Component } from "react";
import { useParams } from "react-router-dom";
function Tweet(props: any) {
	const { id } = useParams();
	return <div>Tweet {id}</div>;
}

export default Tweet;
