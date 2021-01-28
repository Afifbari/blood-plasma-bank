const express = require("express");
const app = express();
const cors = require("cors");
const dontenv = require("dotenv");

dontenv.config();

const dbService = require("./dbService");
const { response } = require("express");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/donors", (req, res) => {
	const db = dbService.getDbServiceInstance();
	const result = db.getAllDonors();

	result
		.then((data) => res.json({ data: data }))
		.catch((err) => console.log(err));
});

app.get("/", (req, res) => {
	res.send("<h1>Hello</h1>");
});

app.post("/registerDonor", (req, res) => {
	const {
		fullName,
		mobile,
		email,
		age,
		gender,
		area,
		district,
		country,
		bloodGroup,
		donated,
		recovered,
		password,
	} = req.body;
	const db = dbService.getDbServiceInstance();

	const result = db.registerDonor(
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

	result
		.then((data) => res.json({ data: data }))
		.catch((err) => console.log(err));
});

app.post("/registerSeeker", (req, res) => {
	const {
		fullName,
		mobile,
		email,
		age,
		gender,
		area,
		district,
		country,
		seekingBloodGroup,
		password,
	} = req.body;
	const db = dbService.getDbServiceInstance();

	const result = db.registerSeeker(
		fullName,
		mobile,
		email,
		gender,
		age,
		area,
		district,
		country,
		seekingBloodGroup,
		password
	);

	result
		.then((data) => res.json({ data: data }))
		.catch((err) => console.log(err));
});

app.post("/login", (req, res) => {
	const { email, password } = req.body;
	const db = dbService.getDbServiceInstance();

	const result = db.login(email, password);

	result
		.then((data) => {
			console.log(data);
			res.json({ data: data });
		})
		.catch((err) => console.log(err));
});

app.post("/seekerLogin", (req, res) => {
	const { email, password } = req.body;
	const db = dbService.getDbServiceInstance();

	const result = db.seekerLogin(email, password);

	result
		.then((data) => res.json({ data: data }))
		.catch((err) => console.log(err));
});

app.post("/request", (req, res) => {
	const { seeker_id, donor_id } = req.body;
	const db = dbService.getDbServiceInstance();

	const result = db.request(seeker_id, donor_id);

	result
		.then((data) => res.json({ seeker_requests: data }))
		.catch((err) => console.log(err));
});

app.get("/request", (req, res) => {
	const { seeker_id } = req.query;
	const db = dbService.getDbServiceInstance();

	const result = db.requestsMade(seeker_id, seeker_id);

	result
		.then((data) => res.json({ data: data }))
		.catch((err) => console.log(err));
});

app.get("/seeker_requests", (req, res) => {
	const { donor_id } = req.query;
	const db = dbService.getDbServiceInstance();

	const result = db.seekerRequests(donor_id);

	result
		.then((data) => res.json({ data: data }))
		.catch((err) => console.log(err));
});

app.post("/searchDonor", (req, res) => {
	const { district, seekingBloodGroup } = req.body;
	const db = dbService.getDbServiceInstance();

	const result = db.searchDonor(district, seekingBloodGroup);

	result
		.then((data) => {
			console.log(data);
			res.json({ data: data });
		})
		.catch((err) => console.log(err));
});

app.post("/updateDonor", (req, res) => {
	const { donor_id, recently_donated } = req.body;
	const db = dbService.getDbServiceInstance();

	console.log(donor_id, recently_donated);

	const result = db.updateDonor(donor_id, recently_donated);

	result
		.then((data) => {
			console.log(data);
			res.json({ data: data });
		})
		.catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => console.log("app is running"));
