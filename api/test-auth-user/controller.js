const User = require('./model');

module.exports = {
  create: info => {
    return new User(info).save();
  },
  request: _ => {
    return User.find();
  },
};
