import React, { useState } from "react";

function DonorRegister() {
	const [fullName, setFullName] = useState("");
	const [mobile, setMobile] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState("");
	const [age, setAge] = useState("");
	const [district, setDistrict] = useState("");
	const [area, setArea] = useState("");
	const [country, setCountry] = useState("");
	const [bloodGroup, setBloodGroup] = useState("");
	const [recovered, setRecovered] = useState("");
	const [donated, setDonated] = useState("");
	const [password, setPassword] = useState("");

	const addDonorHandler = (e) => {
		e.preventDefault();
		console.log(
			fullName,
			mobile,
			email,
			gender,
			age,
			area,
			district,
			country,
			bloodGroup,
			recovered,
			donated,
			password
		);

		fetch("http://localhost:4000/registerDonor", {
			headers: {
				"Content-type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				fullName: fullName,
				mobile: mobile,
				email: email,
				gender: gender,
				age: age,
				area: area,
				district: district,
				country: country,
				bloodGroup: bloodGroup,
				recovered: recovered,
				donated: donated,
				password: password,
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data));

		setFullName("");
		setAge("");
		setMobile("");
		setEmail("");
		setGender("");
		setArea("");
		setDistrict("");
		setCountry("");
		setBloodGroup("");
		setRecovered("");
		setDonated("");
		setPassword("");

		// window.location.reload();
	};

	return (
		<>
			<h1>Donor Registration</h1>
			<form className="form" onSubmit={addDonorHandler}>
				<div className="form-control">
					<label htmlFor="fullName">Full Name : </label>
					<input
						type="text"
						name="fullName"
						id="fullName"
						required
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="mobile">Mobile : </label>
					<input
						type="text"
						name="mobile"
						id="mobile"
						required
						value={mobile}
						onChange={(e) => setMobile(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="email">Email : </label>
					<input
						type="text"
						name="email"
						id="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="gender">Gender : </label>
					<input
						type="text"
						name="gender"
						id="gender"
						value={gender}
						required
						onChange={(e) => setGender(e.target.value)}
					/>
				</div>

				<div className="form-control">
					<label htmlFor="age">Age : </label>
					<input
						type="number"
						name="age"
						id="age"
						value={age}
						required
						onChange={(e) => setAge(e.target.value)}
					/>
				</div>
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
					<label htmlFor="area">Area : </label>
					<input
						type="text"
						name="area"
						id="area"
						value={area}
						required
						onChange={(e) => setArea(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="country">Country : </label>
					<input
						type="text"
						name="country"
						id="country"
						value={country}
						required
						onChange={(e) => setCountry(e.target.value)}
					/>
				</div>

				<div className="form-control">
					<label htmlFor="bloodGroup">Blood Group : </label>
					<input
						type="text"
						name="bloodGroup"
						id="bloodGroup"
						value={bloodGroup}
						required
						onChange={(e) => setBloodGroup(e.target.value)}
					/>
				</div>

				<div className="form-control">
					<label htmlFor="donated">Recently Donated? : </label>
					<input
						type="text"
						name="donated"
						id="donated"
						value={donated}
						required
						onChange={(e) => setDonated(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="recovered">Corona Recovered? : </label>
					<input
						type="text"
						name="recovered"
						id="recovered"
						value={recovered}
						required
						onChange={(e) => setRecovered(e.target.value)}
					/>
				</div>

				<div className="form-control">
					<label htmlFor="password">Password: </label>
					<input
						type="text"
						name="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<br />

				<button type="submit">Register</button>
			</form>
		</>
	);
}

export default DonorRegister;
