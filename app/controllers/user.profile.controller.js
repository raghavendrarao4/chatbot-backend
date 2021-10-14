//Initialize dependencies
const db = require("../models");

//Initialize Mongo collections
const UserProfile = db.userProfile;

//----------------- Operations for UserProfile ------------------//

//Create & save a user profile
exports.create = (req, res) => {

	console.log(req.body);
	//Validate request
	if(!req.body) {
		res.status(400).send({ message: "Content cannot be empty!" });
		return;
	}
	
	//create user profile object
	const userProfile = new UserProfile({
		name: req.body.name,
		email: req.body.email,
		age: req.body.age,
		gender: req.body.gender
	});
	
	//save user profile collection in the DB
	userProfile
		.save(userProfile)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "error during save user profile"
			});
		});
};

//Retrieve all user profiles from Mongo DB
exports.findAll = (req, res) => {

	console.log("Inside find all");
	
	UserProfile.find()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "error while retrieve all user profiles"
			});
		});
};

//Find existing user profile by id
exports.findOne = (req, res) => {

	const userId = req.params.id;
	console.log("inside findOne: " + userId);
	
	UserProfile.findById(userId)
		.then(data => {
			if(!data)
				res.status(404).send({ message: "Not found user profile with id: " + userId });
			else
				res.send(data);
		})
		.catch(err => {
			res.status(500).send({ message: "error retrieve user profile with id: " + userId });
		});
};

//Find existing user profile by email
exports.findByEmail = (req, res) => {
	
	const email = req.query.email;
	console.log("inside find by email: " + email);
	
	UserProfile.find({ email: email })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Error occurred retrieve user profile by email"
			});
		});
};

//Update user profile by id
exports.update = (req, res) => {

	if(!req.body) {
		return res.status(400).send({ message: "data for update cannot be empty!" });
	}
	
	const userId = req.params.id;
	
	UserProfile.findByIdAndUpdate(userId, req.body, { useFindAndModify: false })
		.then(data => {
			if(!data) {
				res.status(404).send({
					message: `Cannot update user profile with id=$userId. Record not found..!!`
				});
			} else {
				res.send({ message: "user profile updated successfully..!!!"});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error with update user profile with id = " + userId
			});
		});
};

//Delete user profile by id
exports.delete = (req, res) => {

	const userId = req.params.id;
	
	UserProfile.findByIdAndRemove(userId)
		.then(data => {
			if(!data) {
				res.status(404).send({
					message: `Cannot delete user profile with id=$userId. Record not found..!!`
				});
			} else {
				res.send({ message: "User profile deleted successfully...!!!" });
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error with delete user profile with id = " + userId
			});
		});
};

//Delete all user profiles
exports.deleteAll = (req, res) => {

	UserProfile.deleteMany({})
		.then(data => {
			res.send({ message: `${data.deletedCount} all user profiles deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Error with delete all user profiles"
			});
		});
};