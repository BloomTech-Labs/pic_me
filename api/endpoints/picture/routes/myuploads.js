const router = require('express').Router();
const { dev } = require('../../../../dev');
const userCTR = require('../../../users/controller');
// const photoCTR = require('../../../photos/controller');
const r = require('../../../helpers/responses');
const image = require('../../../photos/model');
const authenticate = require('../../../helpers/authenticate');

router.route('/myuploads').get(authenticate.sid, (req, res) => {
	userCTR
		.uploads(req.user.id)
		.then(users => r.send(res, 200, users))
		.catch(err =>
			r.send(res, 500, {
				err,
				message: `server error retrieving user uploads`,
			}),
		);
});

module.exports = router;
