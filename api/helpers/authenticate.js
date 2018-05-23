const userCTR = require('../users/controller');
const send = require('./send');

exports.sid = (req, res, next) => {
  if (!req.user) {
    res.status(422).send({ message: `session expired. please log in` });
    return;
  }

  const {
    email,
    password /* this is the hashed password deserialized by `passport` */,
  } = req.user;

  userCTR
    .request({ email })
    .then(user => {
      if (!user) {
        send(res, 500, { err, message: `user (${user.email}) not found` });
        return;
      }

      if (password !== user.password) {
        send(res, 401, {
          message: `passwords did not match. please check password`,
        });
        req.logout(); /* if session password does not match server password, force logout */
        /* this happens if the user updated their password. cookie session no longer has correct password */
        return;
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
};
