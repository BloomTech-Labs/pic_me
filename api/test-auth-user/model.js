const dev = process.env.DEV === 'true';

const send = require('../helpers/send');

// modified version of api_folder branch
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const secret = process.env.SECRET;
const salt = 11;

const options = {};

if (dev) {
  options.user = JSON.parse(process.env.MONGODB).user;
  options.pass = JSON.parse(process.env.MONGODB).pass;
  options.authSource = JSON.parse(process.env.MONGODB).authSource;
}

mongoose.connect('mongodb://localhost/test-auth-user', options);

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, lowercase: true, unique: true, required: true },
  firstName: { type: String, lowercase: true, required: true },
  lastName: { type: String, lowercase: true, required: true },
  password: { type: String, require: true },
});

UserSchema.pre('save', function(next) {
  const user = this;
  const SALT_FACTOR = 10;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function(pswdAttempt, cb) {
  bcrypt.compare(pswdAttempt, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};

// User static methods
//
UserSchema.statics.getAllUsers = cb => {
  User.find({}, (err, users) => {
    if (err) {
      cb({ err: err });
      return;
    }

    cb(users);
  });
};

module.exports = mongoose.model('User', UserSchema);
