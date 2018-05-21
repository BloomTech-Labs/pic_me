const router = require('express').Router();

const debug = process.env.DEBUG === 'true' || false; /* convert str to bool */

router.route('/').get((req, res) => {
  debug
    ? res.send({ pictures: `running` })
    : res.status(404).send({ message: `debug set to false` });
});

module.exports = router;
