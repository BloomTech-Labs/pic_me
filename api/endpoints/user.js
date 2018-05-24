const router = require('express').Router();
const passport = require('passport');

const { debug } = require('../../dev');

/* helpers */
const validate = require('../helpers/validate/validate');
const sanitize = require('../helpers/sanitize');
const authenticate = require('../helpers/authenticate');
const send = require('../helpers/send');

/* controllers */
const userCTR = require('../users/controller');
// const photoCTR = require('../photos/controller')

router
  .route('/')
  .get((req, res) => {
    debug ? send(res, 200, { users: `running` }) : null;
  })
  .post(validate.signup, sanitize.user, (req, res) => {
    userCTR
      .create(req.newUser)
      .then(savedUser => send(res, 201, savedUser))
      .catch(err =>
        send(res, 500, { err, message: `server failed to save new user` }),
      );
  })
  .put(authenticate.sid, validate.update, sanitize.update, (req, res) => {
    userCTR
      .update(req.user.id, req.editedUser)
      .then(editedUser => send(res, 200, sanitize.response(editedUser)))
      .catch(err =>
        send(res, 500, { err, message: `server failed to edit user` }),
      );
  })
  .delete(authenticate.sid, (req, res) => {
    userCTR
      .delete(req.user.id)
      .then(_ => {
        req.logout();

        send(res, 200, `user successfully deleted`);
      })
      .catch(err =>
        send(res, 500, { err, message: `server failed to delete user` }),
      );
  });

router.route('/info').get(authenticate.sid, (req, res) => {
  send(res, 200, sanitize.response(req.user));
});

router
  .route('/login')
  .post(validate.login, passport.authenticate('local'), (req, res) => {
    send(res, 200, `user authenticated`);
  });

router.route('/auth/twitter').get(passport.authenticate('twitter'));

router
  .route('/auth/twitter/callback')
  .get(passport.authenticate('twitter'), (req, res) => {
    send(res, 201, { message: `twitter authenticated successfully` });
  });
//   passport.authenticate('twitter',{}, (req, res) => {
//     // console.log('token', token);
//     // console.log('tokenSecret', tokenSecret);
//     send(res, 201, { message: `twitter user authenticated` });
//   }),
// );

router.route('/logout').get((req, res) => {
  req.logout();
  send(res, 200, `user logged out`);
});

router.route('/all').get(authenticate.sid, (req, res) => {
  userCTR
    .request()
    .then(users => res.send(users))
    .catch(err =>
      send(res, 500, { err, message: `server error retrieving users` }),
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
