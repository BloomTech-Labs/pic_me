const debug = process.env.DEBUG === 'true'; /* convert str to bool */
const dev = process.env.DEV === 'true';

const router = require('express').Router();
const passport = require('passport');

const validate = require('../helpers/validate');
const sanitize = require('../helpers/sanitize');
const controller = dev ? require('../test-auth-user/controller') : null; // TODO: Change second condition to production db controller
// POSSIBLY just delete this and use db controller
/* if so, delete this comment and uncomment out below */
// const controller = require('') // TODO: FILL OUT WITH DB DIR

const authenticate = require('../helpers/authenticate');

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

router.route('/login').post(passport.authenticate('local'), (req, res) => {
  res.send(`user authenticated`);
});

router.route('/logout').get((req, res) => {
  req.logout();
  res.send(`user logged out`);
});

router.route('/all').get(authenticate.sid, (req, res) => {
  controller
    .request()
    .then(users => res.send(users))
    .catch(err =>
      res.status(500).send({ err, message: `server error retrieving users` }),
    );
});

// TODO: custom callback not working atm
// router.route('/login').post((req, res) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err)
//       res
//         .status(500)
//         .send({ err, message: `server failed verify credentials` });
//     if (!user) res.status(422).send({ message: `user not found` });

//     req.login(user, err => {
//       if (err) res.status(500).send({ err, message: `server failed to login` });

//       res.send(`user logged in`);
//     });
//   });
// });

module.exports = router;
