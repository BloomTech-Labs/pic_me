exports.user = (req, res, next) => {
  req.newUser = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nickNames: req.body.nickNames,
  };

  next();
};

exports.update = (req, res, next) => {
  req.editedUser = {};

  Object.keys(req.body.user).forEach(
    field => (req.editedUser[field] = req.body.user[field]),
  );

  next();
};

exports.response = user => {
  return { ...user._doc, password: undefined };
};
