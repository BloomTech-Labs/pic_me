const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const bcrypt = require('bcrypt');

// const MLAB = JSON.parse(process.env.MLAB);

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, lowercase: true, unique: true, required: true },
  firstName: { type: String, lowercase: true, required: true },
  lastName: { type: String, lowercase: true, required: true },
  nickNames: [{ type: String }],
  password: { type: String, require: true },
  createdOn: Date,
  // credits balance: {}
  // stripe hasPaid: {}
  uploads: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
});

// User static methods
UserSchema.plugin(findOrCreate);

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

UserSchema.statics.getAllUsers = function(cb) {
  User.find({}, (err, users) => {
    if (err) {
      cb({ err });
      return;
    }

    cb(users);
  });
};

UserSchema.methods.comparePassword = function(pswdAttempt, cb) {
  bcrypt.compare(pswdAttempt, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
