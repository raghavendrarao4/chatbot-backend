//Define UserProfile model
module.exports = mongoose => {
	
	var template = mongoose.Schema( {
			name: String,
			email: String,
			age: {type: Number, min:0, max: 100},
			gender: {type: String, enum: ['male', 'female']},
			questionnaireId: String
			},
			{ timeStamps: true }
	);
	
	template.method("toJSON", function() {
		const { _v, _id, ...object } = this.toObject();
		object.id = _id;
		object.version = _v;
		return object;
	});

	const UserProfile = mongoose.model("userProfile", template);
	return UserProfile;
}