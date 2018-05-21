require('dotenv').config();

const debug = process.env.DEBUG === 'true' || false; /* convert str to bool */

const router = require('express').Router();

const users = require('./api/endpoints/users');
const pictures = require('./api/endpoints/pictures');

router.use('/users', users);
router.use('/pictures', pictures);

router.route('/').get((req, res) => {
  debug
    ? res.send({ router: 'running' })
    : res.status(404).send({ message: `debug set to false` });
});

module.exports = router;
