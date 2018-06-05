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
router
	.route('/')

	/**
	 * GET /api/pictures/myuploads
	 *
	 * retrieves all photos for logged in user
	 */
	.get(authenticate.sid, (req, res) => {
		userCTR
			.uploads(req.user.id)
			.then(user => r.send(res, 200, sanitize.pictures(user.uploads)))
			.catch(err => r.error(res, err, `server error retrievin	g user uploads`));
	});

/**
 * /api/pictures/myuploads/:id
 * - DELETE: deletes the photo reference to the logged in user's upload
 */
router
	.route('/:id')

	/**
	 * DELETE /api/pictures/myuploads/:id
	 *
	 * deletes the photo reference to the logged in user's upload
	 *
	 * note: this does NOT delete the photo from the photos database
	 *       deleting actual photos is NOT allowed right now
	 *       there should be a disclaimed when uploading photos about this
	 */
	.delete(authenticate.sid, (req, res) => {
		userCTR
			.photoUploadDelete(req.user.id, req.params.id)
			.then(result => r.send(res, 200, result))
			.catch(err => r.error(res, err, `error deleting photo`));
	});

module.exports = router;
