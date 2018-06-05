const Photo = require('./model');

exports.uploadPhoto = function(req, res, next) {
	// upload should be added to user uploads too
	const photo = new Photo(img);
	return photo.save();
};

exports.deletePhoto = _id => {
	return Photo.findByIdAndRemove({ _id });
};

exports.downloadPhoto = function(req, res, next) {};

exports.addToCollection = function(req, res, next) {};

exports.updateTags = function(req, res, next) {};
