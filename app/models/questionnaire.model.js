//Define Questionnaire model
module.exports = mongoose => {
	
	var QuestionSchema = new mongoose.Schema({
		question: String,
		answer: String
	});
	
	var template = mongoose.Schema( {
			disease: String,
			description: String,
			questions: [QuestionSchema]
			},
			{ timeStamps: true }
	);
	
	template.method("toJSON", function() {
		const { _v, _id, ...object } = this.toObject();
		object.id = _id;
		object.version = _v;
		return object;
	});

	const Questionnaire = mongoose.model("questionnaire", template);
	return Questionnaire;
}