const Photo = require('./model');

// exports.uploadPhoto = function(req, res, next) {
// 	// upload should be added to user uploads too
// 	const photo = new Photo(img);
// 	return photo.save();
// };

// exports.deletePhoto = _id => {
// 	return Photo.findByIdAndRemove({ _id });
// };

// exports.downloadPhoto = function(req, res, next) {};

// exports.addToCollection = function(req, res, next) {};

exports.updateTags = function(req, res, next) {};

exports.getPhotosOf = nickNames => {
	let nickNamesString = '';

	nickNamesString += `[`;

	nickNames.forEach(n => (nickNamesString += `"${n}", `));

	nickNamesString = nickNamesString.slice(0, nickNamesString.length - 2);
	nickNamesString += `]`;

	return Photo.$where(
		`this.tags.map(t => t.text).some(e => ${nickNamesString}.includes(e))`,
	);
};

/**
 * parm should be an object (example below):
 * { _id: 5b170c9f84d87a0014b5a042 }
 */
exports.request = parm => {
	if (!parm) return Photo.find();
	return Photo.findOne(parm);
};
