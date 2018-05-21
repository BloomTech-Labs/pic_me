const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

// TODO password reset
// ? Should each user have a thumbnail or avatar

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, lowercase: true, unique: true, required: true },
  firstName: { type: String, lowercase: true, required: true },
  lastName: { type: String, lowercase: true, required: true },
  nickNames: [{ type: String }],
  password: { type: String, require: true },
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
});

module.exports = mongoose.model('User', UserSchema);
