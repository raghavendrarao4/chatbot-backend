//Define Questionnaire Template model
module.exports = mongoose => {
	var template = mongoose.Schema( {
			disease: String,
			description: String,
			gender: {type: String, enum: ['male', 'female']},
			questions: [String]
		},
		{ timeStamps: true }
	);
	
	template.method("toJSON", function() {
		const { _v, _id, ...object } = this.toObject();
		object.id = _id;
		object.version = _v;
		return object;
	});
	
	const QuestionnaireTemplate = mongoose.model("questionnaireTemplate", template);
	return QuestionnaireTemplate;
};