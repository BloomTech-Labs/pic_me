const User = require('./model');

module.exports = {
  create: info => {
    return new User(info).save();
  },
  request: _ => {
    return User.find();
  },
  requestOne: parm => {
    /* should be in the format { email: 'email@e.mail' } */
    return User.findOne(parm);
  },
};
