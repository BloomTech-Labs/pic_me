const mongoose = require('mongoose');
const { Schema } = mongoose;

const PhotoSchema = new Schema({
	owner: { type: Schema.Types.ObjectId, ref: 'User' },
	url: String,
	tags: [{ type: String }],
},
	{
		timestamps: true
	});

module.exports = mongoose.model('Photo', PhotoSchema);
