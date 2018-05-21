require('dotenv').config();

const debug = process.env.DEBUG === 'true' || false; /* convert str to bool */

const router = require('express').Router();

const usersEP = require('./api/endpoints/user');
const picturesEP = require('./api/endpoints/picture');

router.use('/users', usersEP);
router.use('/pictures', picturesEP);

router.route('/').get((req, res) => {
  debug
    ? res.send({ router: 'running' })
    : res.status(404).send({ message: `debug set to false` });
});

module.exports = router;
