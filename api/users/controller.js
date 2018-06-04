const User = require('./model');
const Photo = require('../photos/model')

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
}

exports.collection = _id => {
  return User.findById(_id, 'photos');
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

exports.photoUploadDelete =  (userid, uploadid) => {
  return User.findById(userid, function(err, user){
    uploads_all = user.uploads;
    uploads_removed = uploads_all.filter(function(item) {
      return item._id != uploadid
    });
    user.uploads = uploads_removed;

    var updated_user = User.findByIdAndUpdate(userid, user, {overwrite: true}, function (err, result){
      return result;
    });

    return updated_user;
  });
};
