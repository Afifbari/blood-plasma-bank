import React, { useContext, useState } from "react";
import DonorProfile from "./DonorProfile";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import { UserContext } from "./UserContext";

function SeekerLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { user, setUser } = useContext(UserContext);

	const loginHandler = (e) => {
		e.preventDefault();
		console.log(email, password);

		fetch("http://localhost:4000/seekerLogin", {
			headers: {
				"Content-type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data["data"].length == 0) {
					window.alert("Login email/password is incorrect.");
					setPassword("");
				} else {
					setUser(data["data"][0]);
					localStorage.setItem(
						"user",
						JSON.stringify(data["data"][0])
					);
				}
			});
	};

	return (
		<>
			<h2>Seeker Login</h2>

			<form className="form" onSubmit={loginHandler}>
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

				<button type="submit">Sign in</button>
			</form>

			{user !== null ? (
				<Switch>
					<Redirect to="/profile"></Redirect>
				</Switch>
			) : (
				<p></p>
			)}
		</>
	);
}

export default SeekerLogin;
