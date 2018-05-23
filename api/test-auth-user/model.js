// modified version of api_folder branch
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const bcrypt = require('bcrypt');

// const { dev, debug } = require('../../dev');

const MLAB = JSON.parse(process.env.MLAB);

// const secret = process.env.SECRET;
// const salt = 11;

const options = {};

// if (dev) {
//   options.user = JSON.parse(process.env.MONGODB).user;
//   options.pass = JSON.parse(process.env.MONGODB).pass;
//   options.authSource = JSON.parse(process.env.MONGODB).authSource;
// }

mongoose.connect(`mongodb://${MLAB.USER}:${MLAB.PASS}@${MLAB.URI}`);

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, lowercase: true, unique: true, required: true },
  firstName: { type: String, lowercase: true, required: true },
  lastName: { type: String, lowercase: true, required: true },
  nickNames: [{ type: String }],
  password: { type: String, require: true },
  createdOn: Date,
  uploads: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
});

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

UserSchema.methods.comparePassword = function(pswdAttempt, cb) {
  bcrypt.compare(pswdAttempt, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
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

module.exports = mongoose.model('User', UserSchema);
