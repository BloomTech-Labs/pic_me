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
  bcrypt.hash(this.password + secret, salt, (err, hash) => {
    if (err) {
      send(res, 500, { err, message: `hashing error` });
      return;
    }

    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(password, cb) {
  bcrypt.compare(password + secret, this.password, (err, res) => {
    cb(err, res);
  });
};

UserSchema.methods.checkHashedPassword = function(password) {
  return password === this.password;
};

UserSchema.statics.getAllUsers = cb => {
  User.find({}, (err, users) => {
    if (err) {
      cb({ err: err });
      return;
    }

    cb(users);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
