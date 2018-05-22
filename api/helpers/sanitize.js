module.exports = {
  user: (req, res, next) => {
    req.user = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    next();
  },
};
