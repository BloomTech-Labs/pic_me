const User = require('./model');
// Todo move this into the photos controller
const Image = require('../photos/model');

exports.save = user => {
	return user.save();
};

exports.create = function(info) {
	const user = new User(info);
	return user.save();
};

exports.request = function(parm) {
	if (!parm) return User.find();
	return User.findOne(parm);
};

exports.requestById = _id => {
	return User.findById(_id, (err, user) => {
		if (err) return err;

		return user;
	});
};

exports.update = (_id, user) => {
	return User.findByIdAndUpdate(_id, user, { new: true });
};

exports.delete = _id => {
	return User.findByIdAndRemove({ _id });
};

exports.uploads = _id => {
	return User.findById(_id, 'uploads');
};

exports.photoDelete = _id => {
  return User.uploads.id(_id).remove();
}

// Todo add delete upload controller

exports.collection = function(req, res, next) {
	return User.findById(_id, 'collection');
};

exports.list = function(req, res, next) {
	User.find()
		.sort([['lastName', 'ascending']])
		.exec(
			(error, listUsers) =>
				error
					? next(error)
					: res.render('user_list', { title: 'User List', list: listUsers }),
		);
};
