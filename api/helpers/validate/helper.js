const send = require('../send');

module.exports = {
  checkEmailAndPassword: (res, email, password) => {
    if (!email && !password) {
      send(res, 422, { message: `email and password not provided` });
      return;
    }

    if (!email) {
      send(res, 422, { message: `email not provided` });
      return;
    }

    if (!password) {
      send(res, 422, { message: `password not provided` });
      return;
    }

    return true;
  },
  checkFirstnameAndLastname: (res, firstName, lastName) => {
    if (!firstName && !lastName) {
      send(res, 422, { message: `first and last names not provided` });
      return;
    }

    if (!firstName) {
      send(res, 422, { message: `first name not provided` });
      return;
    }

    if (!lastName) {
      send(res, 422, { message: `last name not provided` });
      return;
    }

    return true;
  },
};
