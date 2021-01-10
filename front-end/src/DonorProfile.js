import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";

function DonorProfile() {
	const { user, setUser } = useContext(UserContext);

	console.log(user);
	return (
		<>
			<h2>Hello, {user ? user.name : <Redirect to="/login" />}</h2>
		</>
	);
}

export default DonorProfile;
