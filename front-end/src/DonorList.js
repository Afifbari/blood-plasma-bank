import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";

const url = "http://localhost:4000/donors";
let requestsUrl = "http://localhost:4000/request?seeker_id=";

function DonorList() {
	const [donors, setDonors] = useState([]);
	const [requestsMade, setRequestsMade] = useState([]);
	let requestFlag = 0;
	let seeker_id = "";

	const { user, setUser } = useContext(UserContext);

	try {
		seeker_id = JSON.parse(localStorage.user).seeker_id;
	} catch (error) {
		console.log(error);
	}

	let user_type = "";

	if (user) {
		user_type = user.user_type;
	} else {
		user_type = "no_user";
	}

	const loadDonors = async () => {
		const result = await fetch(url);
		const data = await result.json();

		if (user_type !== "no_user") {
			const requests = await fetch(requestsUrl + seeker_id);
			const requestsData = await requests.json();

			// console.log(data["data"]);

			// console.log(requestsData["data"]);

			setRequestsMade(requestsData["data"]);
			setDonors(data["data"]);

			console.log(requestsMade);
		}
	};

	const requesHandler = (donor_id) => {
		console.log("seeker_id: " + seeker_id);
		console.log("donor_id: " + donor_id);

		fetch("http://localhost:4000/request", {
			headers: {
				"Content-type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				seeker_id: seeker_id,
				donor_id: donor_id,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setRequestsMade([
					...requestsMade,
					{
						req_id: data.insertId,
						seeker_id: seeker_id,
						donor_id: donor_id,
						status: "not_accepted",
					},
				]);
				console.log(data);
			});
	};

	useEffect(() => {
		loadDonors();
	}, []);

	return (
		<>
			{/* {user_type === "no_user" ? <Redirect to="/login" /> : <></>} */}
			{console.log(user_type)}
			{user_type === "seeker" ? (
				<></>
			) : user_type === "donor" ? (
				<Redirect to="/profile" />
			) : (
				<Redirect to="/login" />
			)}
			<h1>Donor List</h1>

			<table>
				<thead>
					<th>Name</th>
					<th>Gender</th>
					<th>Age</th>
					<th>District</th>
					<th>Blood Group</th>
					<th>Cell Number</th>
				</thead>
				<tbody>
					{donors.map((donor) => (
						<tr key={donor.donor_id}>
							<td>{donor.name}</td>
							<td>{donor.gender}</td>
							<td>{donor.age}</td>
							<td>{donor.district}</td>
							<td>{donor.blood_group}</td>
							<td>
								<section
									style={{ visibility: "hidden", height: "0px" }}
								>
									{requestsMade.map((request) =>
										request.donor_id == donor.donor_id
											? (requestFlag = requestFlag + 1)
											: requestFlag
									)}
								</section>

								<button
									onClick={() => requesHandler(donor.donor_id)}
									disabled={requestFlag !== 0}
								>
									{requestFlag !== 0
										? "Already Requested"
										: "Request"}
								</button>
								<section
									style={{ visibility: "hidden", height: "0px" }}
								>
									{(requestFlag = 0)}
								</section>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default DonorList;
