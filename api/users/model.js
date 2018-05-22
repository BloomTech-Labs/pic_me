const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// TODO import fuse.js after you have usage plan on paper
const { Schema } = mongoose.Schema;
const send = require('../helpers/send');

// TODO password hashing w/bcrypt, may add some Statics onto model
// ? Should each user have a thumbnail or avatar
// ? when deleting (if uploadedBy === user then delete...)
// ? get all photos and filter by user nicknames to build up browsable selection
// ? CreatedOn field..

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, lowercase: true, unique: true, required: true },
  firstName: { type: String, lowercase: true, required: true },
  lastName: { type: String, lowercase: true, required: true },
  nickNames: [{ type: String }],
  password: { type: String, require: true },
  createdOn: Date,
  // credits balance: {}
  // stripe hasPaid: {}
  uploads: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
  collection: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
});

UserSchema.pre('save', (next) => {
  const user = this;
  const SALT_FACTOR = 10;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = (pswdAttempt, cb) => {
  bcrypt.compare(pswdAttempt, this.password, (err, isMatch) => {
    if (err) { return cb(err); }
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
