const mongoose = require('mongoose');
const { Schema } = mongoose;

const PhotoSchema = new Schema({
	owner: { type: Schema.Types.ObjectId, ref: 'User' },
	tags: [{ type: String }],
	img: { data: Buffer, contentType: String },
},
	{
		timestamps: true
	});

// Photo static methods

module.exports = mongoose.model('Photo', PhotoSchema);
