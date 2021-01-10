import React, { useEffect, useState } from "react";

import "./SearchDonor.css";

function SearchDonor() {
	const [district, setDistrict] = useState("");
	const [seekingBloodGroup, setSeekingBloodGroup] = useState("");
	const [seekingBloodType, setSeekingBloodType] = useState("");

	const [donors, setDonors] = useState([]);

	const searchDonorHandler = (e) => {
		e.preventDefault();
		console.log(district, seekingBloodType, seekingBloodGroup);

		fetch("http://localhost:4000/searchDonor", {
			headers: {
				"Content-type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				district: district,

				seekingBloodGroup: seekingBloodGroup,
				seekingBloodType: seekingBloodType,
			}),
		})
			.then((res) => res.json())
			.then((data) => setDonors(data["data"]));
	};

	return (
		<>
			<h1>Search Donors</h1>

			<br />

			<form className="form" onSubmit={searchDonorHandler}>
				<div className="form-control">
					<label htmlFor="district">District : </label>
					<input
						type="text"
						name="district"
						id="district"
						value={district}
						required
						onChange={(e) => setDistrict(e.target.value)}
					/>
				</div>

				<div className="form-control">
					<label htmlFor="bloodGroup">Blood Group : </label>
					<input
						type="text"
						name="bloodGroup"
						id="bloodGroup"
						value={seekingBloodGroup}
						required
						onChange={(e) => setSeekingBloodGroup(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="bloodType">Blood Type : </label>
					<input
						type="text"
						name="bloodType"
						id="bloodType"
						value={seekingBloodType}
						required
						onChange={(e) => setSeekingBloodType(e.target.value)}
					/>
				</div>

				<br />

				<button type="submit">Search</button>
			</form>

			{donors.length > 0 ? (
				<table>
					<thead>
						<th>Name</th>
						<th>Age</th>
						<th>Mobile</th>
						<th>District</th>
						<th>Blood Group</th>
						<th>Blood Type</th>
						<th>Corona Recovered ?</th>
					</thead>
					<tbody>
						{donors.map((donor) => (
							<tr>
								<td>{donor.name}</td>
								<td>{donor.age}</td>
								<td>{donor.mobile}</td>
								<td>{donor.district}</td>
								<td>{donor.blood_group}</td>
								<td>{donor.blood_type}</td>
								<td>{donor.corona_recovered}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p></p>
			)}
		</>
	);
}

export default SearchDonor;
