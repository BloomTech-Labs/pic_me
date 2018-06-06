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
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');
const sanitize = require('../../../helpers/sanitize');

/**
 * /api/pictures/mycollection
 * - GET: retrieves all photos for logged in user
 */
router
	.route('/')

	/**
	 * GET /api/pictures/mycollection
	 *
	 * retrieves all photos for logged in user
	 */
	.get(authenticate.sid, (req, res) => {
		userCTR
			.photos(req.user.id)
			.populate('photos')
			.then(({ photos }) => r.send(res, 200, sanitize.pictures(photos)))
			.catch(err => r.error(res, err, `server error retrieving user photos`));
	});

/**
 * /api/pictures/mycollection/:id
 * - DELETE: deletes the photo reference to the logged in user's photo
 */
router
	.route('/:id')

	/**
	 * DELETE /api/pictures/mycollection/:id
	 *
	 * deletes the photo reference to the logged in user's photo
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
