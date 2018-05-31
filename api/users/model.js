const findOrCreate = require('mongoose-findorcreate');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

// ? Should each user have a thumbnail or avatar
// ? when deleting (if uploadedBy === user then delete...)
// ? get all photos and filter by user nicknames to build up browsable selection

const UserSchema = new Schema({
	email: { type: String, lowercase: true, unique: true, required: true },
	firstName: { type: String, lowercase: true, required: true },
	lastName: { type: String, lowercase: true, required: true },
	nickNames: [{ type: String }],
	password: { type: String, require: true },
	// uploads: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
	uploads: [{ type: String }],
	photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
	// credits balance: {}
	// stripe hasPaid: {}
}, 
	{
		timestamps: true
	});

// User static methods
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

UserSchema.plugin(findOrCreate);

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
