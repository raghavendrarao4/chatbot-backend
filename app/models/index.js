//define db config & mongoose libraries
const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.questionnaireTemplate = require("./questionnaire.template.model.js")(mongoose);
db.questionnaire = require("./questionnaire.model.js")(mongoose);
db.userProfile = require("./userprofile.model.js")(mongoose);

module.exports = db;