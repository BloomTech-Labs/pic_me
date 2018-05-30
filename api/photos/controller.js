const Photo = require('./model');

exports.uploadPhoto = function(req, res, next) {
  // upload should be added to user uploads too
  const photo = new Photo(img);
  return photo.save();
};

exports.deletePhoto = function(req, res, next) {};

exports.downloadPhoto = function(req, res, next) {};

exports.addToCollection = function(req, res, next) {};

exports.updateTags = function(req, res, next) {};
