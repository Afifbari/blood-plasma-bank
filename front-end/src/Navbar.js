import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
	const { user, setUser } = useContext(UserContext);
	let user_type = "";

	if (user) {
		user_type = user.user_type;
	}

	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Registration</Link>
				</li>
				{user_type === "seeker" ? (
					<li>
						<Link to="/donors">List</Link>
					</li>
				) : (
					<></>
				)}
				{user_type === "donor" ? (
					<li>
						<Link to="/seeker_requests">Requests</Link>
					</li>
				) : (
					<></>
				)}

				<li>
					<Link to="/seeker_reg">Seeker Registration</Link>
				</li>
				<li>
					<Link to="/search">Search Donor</Link>
				</li>
				{user ? (
					<li
						onClick={() => {
							setUser(null);
							localStorage.clear();
						}}
					>
						<Link to="/login">Logout</Link>
					</li>
				) : (
					<>
						<li>
							<Link to="/login">Sign in</Link>
						</li>
						<li>
							<Link to="/seekerLogin">Seeker Sign in</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Navbar;
