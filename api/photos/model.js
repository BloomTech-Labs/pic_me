const mongoose = require('mongoose');
const { Schema } = mongoose;

const PhotoSchema = new Schema({
	// uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	img: { data: Buffer, contentType: String },
	tags: [{ type: String }],
	createdAt: { type: Date, default: Date.now }, 
});

// Photo static methods
// get all photos
// get photos by tag
module.exports = mongoose.model('Photo', PhotoSchema);
