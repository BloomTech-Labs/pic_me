const User = require('../test-auth-user/model');

module.exports = {
  sid: (req, res, next) => {
    if (!req.user) {
      res.status(422).send({ message: `session expired. please log in` });
      return;
    }

    const {
      email,
      password /* this is the hashed password deserialized by `passport` */,
    } = req.user;

    User.findOne({ email })
      .then(user => {
        // if (err) {
        //   res.status(500).send({
        //     err,
        //     message: `error retrieving information for user`,
        //   });
        //   return;
        // }

        if (!user) {
          res
            .status(500)
            .send({ err, message: `user (${user.email}) not found` });
          return;
        }

        if (password !== user.password) {
          res
            .status(422)
            .send({ message: `passwords did not match. please log back in` });
          req.logout(); /* if session password does not match server password, force logout */
        }

        /* user is found and password in session matches user's server-side password */
        next();
      })
      .catch(err =>
        res.status(500).send({
          err,
          message: `error retrieving information for user ${req.user}`,
        }),
      );
  },
};
