//Update routes here

module.exports = app =>  {
	
	//initialize router
	var router = require("express").Router();
	
	const questionnaire = require("../controllers/questionnaire.controller.js");
	const questionnaireTemplate = require("../controllers/questionnaire.template.controller.js");
	const userProfile = require("../controllers/user.profile.controller.js");

	//------------------------------------------------
	//create questionnaire
	router.post("/questionnaire", questionnaire.create);
	
	//retrieve all questionnaire
	router.get("/questionnaire", questionnaire.findAll);
	
	//retrieve single questionnaire with id
	router.get("/questionnaire/:id", questionnaire.findOne);
	
	//update questionnaire by id
	router.put("/questionnaire/:id", questionnaire.update);
	
	//delete questionnaire by id
	router.delete("/questionnaire/:id", questionnaire.delete);
	
	//delete all questionnaire
	router.delete("/questionnaire", questionnaire.deleteAll);

	//------------------------------------------------
	//create questionnaire template
	router.post("/template", questionnaireTemplate.create);
	
	//retrieve all questionnaire templates
	router.get("/template", questionnaireTemplate.findAll);
	
	//retrieve single questionnaire template with id
	router.get("/template/:id", questionnaireTemplate.findOne);
	
	//update questionnaire template by id
	router.put("/template/:id", questionnaireTemplate.update);
	
	//delete questionnaire template by id
	router.delete("/template/:id", questionnaireTemplate.delete);
	
	//delete all questionnaire templates
	router.delete("/template", questionnaireTemplate.deleteAll);

	//------------------------------------------------
	//create user profile
	router.post("/user", userProfile.create);
	
	//retrieve all user profiles
	router.get("/user", userProfile.findAll);
	
	//retrieve single user profile with id
	router.get("/user/:id", userProfile.findOne);
	
	//update user profile by id
	router.put("/user/:id", userProfile.update);
	
	//delete user profile by id
	router.delete("/user/:id", userProfile.delete);
	
	//delete all user profiles
	router.delete("/user", userProfile.deleteAll);
	
};