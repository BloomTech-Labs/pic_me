const mongoose = require('mongoose');
const { Schema } = mongoose;
/* 
	The tags field should be filled with other user nicknames 
	May need a separate form where we can then implement a
	Fuzzy Search on a master array of all nicknames in the database
	so the user can easily add the tags on the image(s) they've 
	uploaded
*/
// ? How will image access be determined (uploads & collection)
const PhotoSchema = new Schema({
	owner: { type: Schema.Types.ObjectId, ref: 'User' },
	url: String,
	tags: [{ type: String }],
},
	{
		timestamps: true
	});

module.exports = mongoose.model('Photo', PhotoSchema);
