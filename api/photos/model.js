const mongoose = require('mongoose');
const { Schema } = mongoose;

const PhotoSchema = new Schema({
	owner: { type: Schema.Types.ObjectId, ref: 'User' },
	url: String,
	tags: [{ 
		id: String,
		text: String,
		// type: String 
	}],
},
	{
		timestamps: true
	});

module.exports = mongoose.model('Photo', PhotoSchema);
