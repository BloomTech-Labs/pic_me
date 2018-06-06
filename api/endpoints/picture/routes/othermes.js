const router = require('express').Router();

const { debug } = require('../../../../dev');

/**
 * controller that interacts with the users table in database
 */
const photoCTR = require('../../../photos/controller');

/**
 * general helper functions for all api endpoints
 */
const validate = require('../../../helpers/validate/index');
const sanitize = require('../../../helpers/sanitize');
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');

/**
 * /api/pictures/othermes
 * - GET:    retrieves pictures of user uploaded by others
 */
router
	.route('/')

	/**
	 * GET /api/pictures/othermes
	 *
	 * retrieves pictures of user uploaded by others
	 */
	.get(authenticate.sid, (req, res) => {
		photoCTR.getPhotosOf(req.user.nickNames).exec((err, docs) => {
			if (err) {
				r.error(res, err, `error finding pictures of you`);
				return;
			}

			r.send(res, 200, sanitize.pictures(docs));
		});
	});

module.exports = router;
