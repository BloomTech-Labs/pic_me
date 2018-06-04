const router = require('express').Router();

const { dev } = require('../../../../dev');

/**
 * controller that interacts with the users table in database
 */
const userCTR = require('../../../users/controller');

/**
 * general helper functions for all api endpoints
 */
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');

/**
 * /api/users/all
 * - GET: dev route for seeing all users
 */
router
	.route('/')
	.get(authenticate.sid, (req, res) => {
		dev
			? userCTR
					.request()
					.then(users => r.send(res, 200, users))
					.catch(err =>
						r.send(res, 500, { err, message: `server error retrieving users` }),
					)
			: null;
	});

module.exports = router;
