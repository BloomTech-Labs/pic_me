const dev = process.env.DEV === 'true';

// modified version of api_folder branch
const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', UserSchema);
