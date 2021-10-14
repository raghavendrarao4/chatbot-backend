//Initialize dependencies
const db = require("../models");

//Initialize Mongo collections
const Questionnaire = db.questionnaire;

//----------------- Operations for Questionnaire ------------------//

//Create & save a questionnaire
exports.create = (req, res) => {
	
	console.log(req.body);
	//Validate request
	if(!req.body) {
		res.status(400).send({ message: "Content cannot be empty!" });
		return;
	}
	
	//create questionnaire object
	const questionnaire = new Questionnaire({
		disease: req.body.disease,
		description: req.body.description,
		questions: req.body.questions
	});
	
	//save questionnaire collection in the DB
	questionnaire
		.save(questionnaire)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "error during save questionnaire"
			});
		});
};

//Retrieve all questionnaire from Mongo DB
exports.findAll = (req, res) => {
	
	Questionnaire.find()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "error while retrieve all questionnaire"
			});
		});
};

//Find existing questionnaire by id
exports.findOne = (req, res) => {
	
	const questionnaireId = req.params.id;
	Questionnaire.findById(questionnaireId)
		.then(data => {
			if(!data)
				res.status(404).send({ message: "Not found questionnaire with id: " + questionnaireId });
			else
				res.send(data);
		})
		.catch(err => {
			res.status(500).send({ message: "error retrieve questionnaire with id: " + questionnaireId });
		});
};

//Update questionnaire by id
exports.update = (req, res) => {
	
	if(!req.body) {
		return res.status(400).send({ message: "data for update cannot be empty!" });
	}
	
	const questionnaireId = req.params.id;
	
	Questionnaire.findByIdAndUpdate(questionnaireId, req.body, { useFindAndModify: false })
		.then(data => {
			if(!data) {
				res.status(404).send({
					message: `Cannot update questionnaire with id=$questionnaireId. Record not found..!!`
				});
			} else {
				res.send({ message: "Questionnaire updated successfully..!!!"});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error with update questionnaire with id = " + questionnaireId
			});
		});
};

//Delete questionnaire by id
exports.delete = (req, res) => {
	
	const questionnaireId = req.params.id;
	
	Questionnaire.findByIdAndRemove(questionnaireId)
		.then(data => {
			if(!data) {
				res.status(404).send({
					message: `Cannot delete questionnaire with id=$questionnaireId. Record not found..!!`
				});
			} else {
				res.send({ message: "Questionnaire deleted successfully...!!!" });
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error with delete questionnaire with id = " + questionnaireId
			});
		});
};

//Delete all questionnaire
exports.deleteAll = (req, res) => {
	
	Questionnaire.deleteMany({})
		.then(data => {
			res.send({ message: `${data.deletedCount} all questionnaire deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Error with delete all questionnaire"
			});
		});
};
