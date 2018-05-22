const debug = process.env.DEBUG === 'true'; /* convert str to bool */
const dev = process.env.DEV === 'true';

const router = require('express').Router();
// const passport = require('passport');

const validate = require('../helpers/validate');
const sanitize = require('../helpers/sanitize');
const controller = dev ? require('../test-auth-user/controller') : null; // TODO: Change second condition to production db controller
// POSSIBLY just delete this and use db controller
/* if so, delete this comment and uncomment out below */
// const controller = require('') // TODO: FILL OUT WITH DB DIR

router
  .route('/')
  .get((req, res) => {
    debug
      ? res.send({ users: `running` })
      : res.status(404).send({ message: `debug set to false` });
  })
  .post(validate.signup, sanitize.user, (req, res) => {
    controller
      .create(req.user)
      .then(savedUser => res.status(201).send(savedUser))
      .catch(err =>
        res
          .status(500)
          .send({ err, message: `server failed to save new user` }),
      );
  });

// router
//   .route('/login')
//   .post(
//     passport.authenticate('local', { failureFlash: true, session: false }),
//     (req, res) => {
//       res.send({ message: `user (${req.user}) authenticated successfully` });
//     },
//   );

module.exports = router;
