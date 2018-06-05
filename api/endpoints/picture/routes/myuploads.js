const router = require('express').Router();

/**
 * controller that interacts with the users table in database
 */
const userCTR = require('../../../users/controller');

/**
 * controller that interacts with the photos table in database
 */
const photoCTR = require('../../../photos/controller');

/**
 * general helper functions for all api endpoints
 */
const sanitize = require('../../../helpers/sanitize');
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');

/**
 * /api/pictures/myuploads
 * - GET: retrieves all photos for logged in user
 */
router.route('/').get(authenticate.sid, (req, res) => {
	userCTR
		.uploads(req.user.id)
		.then(user => r.send(res, 200, sanitize.pictures(user.uploads)))
		.catch(err => r.error(res, err, `server error retrievin	g user uploads`));
});

/**
 * /api/pictures/myuploads/:id
 * - DELETE: deletes the photo specified by the logged in user (given an id)
 */
router.route('/:id').delete(authenticate.sid, (req, res) => {
	photoCTR
		.deletePhoto(req.params.id)
		.then(_ => r.send(res, 200, { message: `photo deleted` }))
		.catch(err => r.error(res, err, `error deleting photo`));
});

module.exports = router;
