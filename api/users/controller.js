/* eslint-disable func-names */
/* eslint-disable no-confusing-arrow */
const User = require('./model');

exports.create = function (info) {
  const user = new User(info);
  return user.save();
};

exports.update = function (req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (err) { return next(err); }
    if (user === null) {
      let err = new Error('User not found');
      err.status = 404;
      return next(err);
    }
    res.send({ message: 'Success, user now updated.' });
  });
};

exports.delete = function (req, res, next) {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.send({ message: 'User Deleted.' });
  });
};

exports.list = function (req, res, next) {
  User.find()
    .sort([['lastName', 'ascending']])
    .exec((error, listUsers) => error
      ? next(error)
      : res.render('user_list', { title: 'User List', list: listUsers }));
};

exports.uploads = function (req, res, next) {
  const query = User.find({}).select('uploads - id');

  query.exec((err, uploads) => {
    if (err) { return next(err); }
    res.send(uploads);
  });
};

exports.collection = function (req, res, next) {
  const query = User.find({}).select('collection - id');

  query.exec((err, collection) => {
    if (err) { return next(err); }
    res.send(collection);
  });
};
