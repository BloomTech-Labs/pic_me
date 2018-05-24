const User = require('./model');

exports.create = function(info) {
  const user = new User(info);
  return user.save();
};

exports.request = function(parm) {
  if (!parm) return User.find();
  return User.findOne(parm);
};

exports.update = (_id, user) => {
  return User.findByIdAndUpdate(_id, user, { new: true });
};

exports.delete = function(req, res, next) {
  User.findByIdAndRemove(req.params.id, err => {
    if (err) {
      return next(err);
    }
    res.send({ message: 'User Deleted.' });
  });
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

exports.uploads = function(req, res, next) {
  const query = User.find({}).select('uploads - id');

  query.exec((err, uploads) => {
    if (err) {
      return next(err);
    }
    res.send(uploads);
  });
};

exports.collection = function(req, res, next) {
  const query = User.find({}).select('collection - id');

  query.exec((err, collection) => {
    if (err) {
      return next(err);
    }
    res.send(collection);
  });
};
