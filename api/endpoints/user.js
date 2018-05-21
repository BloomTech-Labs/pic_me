const router = require('express').Router();
// const passport = require('passport');

const debug = process.env.DEBUG === 'true' || false; /* convert str to bool */

router.route('/').get((req, res) => {
  debug
    ? res.send({ users: `running` })
    : res.status(404).send({ message: `debug set to false` });
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
