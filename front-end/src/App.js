import DonorRegister from "./DonorRegister";
import DonorList from "./DonorList";

import "./App.css";
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SeekerRegister from "./SeekerRegister";
import SearchDonor from "./SearchDonor";
import Login from "./Login";
import DonorProfile from "./DonorProfile";
import { UserContext } from "./UserContext";
import SeekerLogin from "./SeekerLogin";
import RequestList from "./RequestList";

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const localData = localStorage.getItem("user");

		if (localData) {
			setUser(JSON.parse(localData));
		}
	}, []);

	return (
		<>
			<h1>Blood Plasma Bank</h1>

			<br />
			<br />
			<br />

			<Router>
				<UserContext.Provider value={{ user, setUser }}>
					<Navbar />
				</UserContext.Provider>

				<Switch>
					<Route exact path="/">
						<DonorRegister />
					</Route>
					<Route path="/donors">
						<UserContext.Provider value={{ user, setUser }}>
							<DonorList />
						</UserContext.Provider>
					</Route>
					<Route path="/seeker_requests">
						<UserContext.Provider value={{ user, setUser }}>
							<RequestList />
						</UserContext.Provider>
					</Route>
					<Route path="/seeker_reg">
						<SeekerRegister />
					</Route>
					<Route path="/search">
						<SearchDonor />
					</Route>
					<Route path="/login">
						<UserContext.Provider value={{ user, setUser }}>
							<Login />
						</UserContext.Provider>
					</Route>
					<Route path="/seekerLogin">
						<UserContext.Provider value={{ user, setUser }}>
							<SeekerLogin />
						</UserContext.Provider>
					</Route>
					<Route path="/profile">
						<UserContext.Provider value={{ user, setUser }}>
							<DonorProfile />
						</UserContext.Provider>
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
