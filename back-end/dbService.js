const mysql = require("mysql");
const dotenv = require("dotenv");
const { response } = require("express");

let instance = null;

dotenv.config();

const connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	port: process.env.DB_PORT,
	database: process.env.DATABASE,
});

connection.connect((err) => {
	if (err) {
		console.log(err.message);
	}
	console.log("db " + connection.state);
});

class DbService {
	static getDbServiceInstance() {
		return instance ? instance : new DbService();
	}

	async getAllDonors() {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "SELECT * FROM donor;";
				connection.query(query, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (error) {
			console.log(err);
		}
	}

	async registerDonor(
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
	) {
		try {
			const regDate = new Date();
			const userType = "donor";
			const insertId = await new Promise((resolve, reject) => {
				const query =
					"INSERT INTO donor (name, mobile, email, gender, age, district, area, country, reg_date, blood_group, password, recently_donated, corona_recovered, user_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
				connection.query(
					query,
					[
						fullName,
						mobile,
						email,
						gender,
						age,
						district,
						area,
						country,
						regDate,
						bloodGroup,
						password,
						donated,
						recovered,
						userType,
					],
					(err, result) => {
						if (err) reject(new Error(err.message));
						resolve(result.insertId);
					}
				);
			});
			console.log(insertId);
			return {
				id: insertId,
				fullName: fullName,
				regDate: regDate,
			};
		} catch (err) {
			console.log(err);
		}
	}

	async registerSeeker(
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
	) {
		try {
			const regDate = new Date();
			const userType = "seeker";
			const insertId = await new Promise((resolve, reject) => {
				const query =
					"INSERT INTO seeker (name, mobile, email, gender, age, district, area, country, reg_date, seeking_blood_group, password, user_type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);";
				connection.query(
					query,
					[
						fullName,
						mobile,
						email,
						gender,
						age,
						district,
						area,
						country,
						regDate,
						seekingBloodGroup,
						password,
						userType,
					],
					(err, result) => {
						if (err) reject(new Error(err.message));
						resolve(result.insertId);
					}
				);
			});
			console.log(insertId);
			return {
				id: insertId,
				fullName: fullName,
				regDate: regDate,
			};
		} catch (err) {
			console.log(err);
		}
	}

	async searchDonor(district, seekingBloodGroup) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query =
					"SELECT * FROM donor WHERE district = ? AND blood_group = ? AND corona_recovered = ? AND recently_donated = ?;";
				connection.query(
					query,
					[district, seekingBloodGroup, "yes", "no"],
					(err, results) => {
						if (err) reject(new Error(err.message));
						resolve(results);
					}
				);
			});
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	async updateDonor(donor_id, recently_donated) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query =
					"UPDATE donor SET recently_donated = ? WHERE donor_id = ?;";
				connection.query(
					query,
					[recently_donated, donor_id],
					(err, results) => {
						if (err) reject(new Error(err.message));
						resolve(results);
					}
				);
			});
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	async login(email, password) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query =
					"SELECT * FROM donor WHERE email = ? AND password = ?;";
				connection.query(query, [email, password], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	async seekerLogin(email, password) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query =
					"SELECT * FROM seeker WHERE email = ? AND password = ?;";
				connection.query(query, [email, password], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	async request(seeker_id, donor_id) {
		try {
			const response = await new Promise((resolve, reject) => {
				let status = "not_accepted";
				const query =
					"INSERT INTO requests (seeker_id, donor_id, status) VALUES (?,?,?);";
				connection.query(
					query,
					[seeker_id, donor_id, status],
					(err, results) => {
						if (err) reject(new Error(err.message));
						resolve(results);
					}
				);
			});
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	async requestsMade(seeker_id) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "SELECT * FROM requests WHERE seeker_id = ?;";
				connection.query(query, [seeker_id], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	async seekerRequests(donor_id) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query =
					"SELECT * FROM seeker WHERE seeker_id = (SELECT seeker_id FROM requests WHERE donor_id = ?);";
				connection.query(query, [donor_id], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				});
			});
			return response;
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = DbService;
