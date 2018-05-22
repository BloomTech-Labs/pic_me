/* eslint-disable func-names */
/* eslint-disable no-confusing-arrow */
const User = require('./model');

exports.userCreate = function (req, res, next) {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nickNames: req.body.nickNames,
    password: req.body.password,
  });
  user.save((err) => {
    if (err) { return next(err); }
    res.send({ message: 'New user created.' });
  });
};

exports.userUpdate = function (req, res, next) {
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

exports.userDelete = function (req, res, next) {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.send({ message: 'User Deleted.' });
  });
};

exports.userList = function (req, res, next) {
  User.find()
    .sort([['lastName', 'ascending']])
    .exec((error, listUsers) => error
      ? next(error)
      : res.render('user_list', { title: 'User List', userList: listUsers }));
};

exports.userUploads = function (req, res, next) {
  const query = User.find({}).select('uploads - id');

  query.exec((err, uploads) => {
    if (err) { return next(err); }
    res.send(uploads);
  });
};

exports.userCollection = function (req, res, next) {
  const query = User.find({}).select('collection - id');

  query.exec((err, collection) => {
    if (err) { return next(err); }
    res.send(collection);
  });
};
