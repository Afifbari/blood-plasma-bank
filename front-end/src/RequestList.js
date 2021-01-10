import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";

let requestsUrl = "http://localhost:4000/seeker_requests?donor_id=";

function RequestList() {
	const { user, setUser } = useContext(UserContext);
	const [seekerRequests, setSeekerRequests] = useState([]);

	let user_type = "";

	if (user) {
		user_type = user.user_type;
	}

	let donor_id = "";

	try {
		donor_id = JSON.parse(localStorage.user).donor_id;
	} catch (error) {
		console.log(error);
	}

	const loadRequests = async () => {
		if (user_type !== "") {
			console.log(requestsUrl + donor_id);
			const requests = await fetch(requestsUrl + donor_id);
			const requestsData = await requests.json();

			console.log(requestsData["data"]);

			setSeekerRequests(requestsData["data"]);
		}
	};

	useEffect(() => {
		loadRequests();
	}, []);

	return (
		<>
			{user_type === "donor" ? (
				<></>
			) : user_type === "" ? (
				<Redirect to="/login" />
			) : (
				<Redirect to="/profile" />
			)}

			<h1>Request List</h1>

			<table>
				<thead>
					<th>Name</th>
					<th>Gender</th>
					<th>Age</th>
					<th>District</th>

					<th>Cell Number</th>
				</thead>
				{seekerRequests.length == 0 ? (
					<tbody>
						<td colSpan="5">No Requests</td>
					</tbody>
				) : (
					<tbody>
						{seekerRequests.map((seeker) => (
							<tr key={seeker.seeker_id}>
								<td>{seeker.name}</td>
								<td>{seeker.gender}</td>
								<td>{seeker.age}</td>
								<td>{seeker.district}</td>
								<td>{seeker.mobile}</td>
							</tr>
						))}
					</tbody>
				)}
			</table>
		</>
	);
}

export default RequestList;
