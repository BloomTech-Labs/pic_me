const send = require('../send');

exports.checkEmailAndPassword = (res, email, password) => {
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
};

exports.checkFirstnameAndLastname = (res, firstName, lastName) => {
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
};

exports.checkNicknames = (res, nickNames) => {
  if (!Array.isArray(nickNames)) {
    return;
  }

  if (!nickNames.length > 0) {
    send(res, 422, { message: `no nicknames provided` });
    return;
  }

  const maxNicknames = process.env.MAX_NICKNAMES;

  if (nickNames.length > maxNicknames) {
    send(res, 422, {
      message: `too many nicknames provided (${
        nickNames.length
      } provided, ${maxNicknames} max)`,
    });
    return;
  }

  for (let i = 0; i < nickNames.length; i++) {
    if (typeof nickNames[i] !== 'string') return;
  }

  return true;
};
