//Initialize dependencies
const db = require("../models");

//Initialize Mongo collections
const QuestionnaireTemplate = db.questionnaireTemplate;
//----------------- Operations for QuestionnaireTemplate ------------------//

//Create & save a questionnaire template
exports.create = (req, res) => {

	console.log(req.body);
	
	//Validate request
	if(!req.body) {
		res.status(400).send({ message: "Content cannot be empty!" });
		return;
	}
	
	//create questionnaireTemplate object
	const questionnaireTemplate = new QuestionnaireTemplate({
		disease: req.body.disease,
		description: req.body.description,
		gender: req.body.gender,
		questions: req.body.questions
	});
	
	//save questionnaireTemplate collection in the DB
	questionnaireTemplate
		.save(questionnaireTemplate)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "error during save questionnaire template"
			});
		});
};

//Retrieve all questionnaire templates from Mongo DB
exports.findAll = (req, res) => {

	QuestionnaireTemplate.find()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "error while retrieve all questionnaire templates"
			});
		});
};

//Find existing questionnaire template by id
exports.findOne = (req, res) => {

	const questionnaireTemplateId = req.params.id;
	QuestionnaireTemplate.findById(questionnaireTemplateId)
		.then(data => {
			if(!data)
				res.status(404).send({ message: "Not found questionnaire template with id: " + questionnaireTemplateId });
			else
				res.send(data);
		})
		.catch(err => {
			res.status(500).send({ message: "error retrieve questionnaire template with id: " + questionnaireTemplateId });
		});
};

//Update questionnaire template by id
exports.update = (req, res) => {

	if(!req.body) {
		return res.status(400).send({ message: "data for update cannot be empty!" });
	}
	
	const questionnaireTemplateId = req.params.id;
	
	QuestionnaireTemplate.findByIdAndUpdate(questionnaireTemplateId, req.body, { useFindAndModify: false })
		.then(data => {
			if(!data) {
				res.status(404).send({
					message: `Cannot update questionnaire template with id=$questionnaireTemplateId. Record not found..!!`
				});
			} else {
				res.send({ message: "Questionnaire template updated successfully..!!!"});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error with update questionnaire template with id = " + questionnaireTemplateId
			});
		});
};

//Delete questionnaire template by id
exports.delete = (req, res) => {

	const questionnaireTemplateId = req.params.id;
	
	QuestionnaireTemplate.findByIdAndRemove(questionnaireTemplateId)
		.then(data => {
			if(!data) {
				res.status(404).send({
					message: `Cannot delete questionnaire template with id=$questionnaireTemplateId. Record not found..!!`
				});
			} else {
				res.send({ message: "Questionnaire template deleted successfully...!!!" });
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error with delete questionnaire template with id = " + questionnaireTemplateId
			});
		});
};

//Delete all questionnaire templates
exports.deleteAll = (req, res) => {

	QuestionnaireTemplate.deleteMany({})
		.then(data => {
			res.send({ message: `${data.deletedCount} all questionnaire templates deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Error with delete all questionnaire templates"
			});
		});
};
