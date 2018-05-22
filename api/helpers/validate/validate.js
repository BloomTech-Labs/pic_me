const send = require('../../helpers/send');
const {
  checkEmailAndPassword,
  checkFirstnameAndLastname,
} = require('./helper');

module.exports = {
  signup: (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;

    if (!checkEmailAndPassword(res, email, password)) return;
    if (!checkFirstnameAndLastname(res, firstName, lastName)) return;

    next();
  },
  login: (req, res, next) => {
    /* check if there is a user logged in already */
    if (req.user) {
      send(res, 422, { message: `user (${req.user.email}) already logged in` });
      return;
    }

    const { email, password } = req.body;

    checkEmailAndPassword(res, email, password);

    next();
  },
};
