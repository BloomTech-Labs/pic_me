const router = require('express').Router();

const { dev, debug } = require('../../dev');

router.route('/').get((req, res) => {
  debug
    ? res.send({ pictures: `running` })
    : res.status(404).send({ message: `debug set to false` });
});

module.exports = router;
