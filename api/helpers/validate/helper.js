const send = require('../send');
const message = require('./messages');

const userFieldsEditable = JSON.parse(process.env.EDITABLE_FIELDS);

exports.checkEmailAndPassword = (res, email, password) => {
  if (!email && !password) {
    send(res, 422, message.emailPasswordNotProvided);
    return;
  }

  if (!email) {
    send(res, 422, message.emailNotProvided);
    return;
  }

  if (!password) {
    send(res, 422, message.passwordNotProvided);
    return;
  }

  return true;
};

exports.checkFirstnameAndLastname = (res, firstName, lastName) => {
  if (!firstName && !lastName) {
    send(res, 422, message.firstLastNameNotProvided);
    return;
  }

  if (!firstName) {
    send(res, 422, message.firstNameNotProvided);
    return;
  }

  if (!lastName) {
    send(res, 422, message.lastNameNotProvided);
    return;
  }

  return true;
};

exports.checkNicknames = (res, nickNames) => {
  if (!nickNames) {
    send(res, 422, message.nickName.notProvided);
    return;
  }

  if (!Array.isArray(nickNames)) {
    send(res, 422, message.nickName.notAnArray);
    return;
  }

  const maxNicknames = process.env.MAX_NICKNAMES;

  if (nickNames.length > maxNicknames) {
    send(res, 422, message.nickName.tooManyProvided(nickNames, maxNicknames));
    return;
  }

  for (let i = 0; i < nickNames.length; i++) {
    if (typeof nickNames[i] !== 'string') {
      send(res, 422, message.nickName(i, nickNames[i]));
      return;
    }
  }

  return true;
};

// exports.checkIdAndLoggedInId = (res, id1, id2) => {
//   if (id1 !== id2) {
//     send(res, 401, message.idMismatch);
//     return;
//   }

//   return true;
// };

exports.checkUser = (res, user) => {
  if (!user) {
    send(res, 422, message.userNotProvided);
    return;
  }

  const userKeys = Object.keys(user); /* the keys for user object in request */

  /* check each key to make sure there is at least one editable field */
  for (let i = 0; i < userKeys.length; i++) {
    const field = userKeys[i];

    if (userFieldsEditable.includes(field)) {
      return true;
    }
  }

  send(res, 422, message.userFieldNoneFound);
};

exports.checkForChangedFields = (res, req, user) => {
  const userFields = Object.keys(user);
  let hasChangedField = false;

  for (let i = 0; i < userFields.length; i++) {
    const field = userFields[i];

    /* if field is nickNames, an Array */
    if (field === 'nickNames') {
      /* sort and check both nickNames */
      if (
        JSON.stringify(user['nickNames'].sort()) !==
        JSON.stringify(req.user['nickNames'].sort())
      ) {
        hasChangedField = true;
        break;
      }
    } else if (user[field] !== req.user[field]) {
      hasChangedField = true;
      break;
    }
  }

  if (hasChangedField) {
    return true;
  }

  send(res, 422, message.noUserFieldsChanged);
};
