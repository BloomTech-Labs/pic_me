const router = require('express').Router();

const { dev, debug } = require('./dev');

const usersEP = require('./api/endpoints/user');
const picturesEP = require('./api/endpoints/picture');

router.use('/users', usersEP);
router.use('/pictures', picturesEP);

router.route('/').get((req, res) => {
  debug ? res.send({ router: 'running' }) : null;
});

module.exports = router;
