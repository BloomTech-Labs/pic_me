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
 * /api/pictures/myuploads
 * - GET: retrieves all uploaded photos for logged in user
 */
router
	.route('/')

	/**
	 * GET /api/pictures/myuploads
	 *
	 * retrieves all uploaded photos for logged in user
	 */
	.get(authenticate.sid, (req, res) => {
		userCTR
			.uploads(req.user.id)
			.then(user => r.send(res, 200, sanitize.pictures(user.uploads)))
			.catch(err => r.error(res, err, `server error retrieving user uploads`));
	});

/**
 * /api/pictures/myuploads/:id
 * - DELETE: deletes the photo reference to the logged in user's upload
 */
router
	.route('/:id')

	/**
	 * PUT /api/pictures/myupoads/:id
	 *
	 * edits the tags of the uploaded picture
	 *
	 * tags are formatted as:
	 * [{ id: TAG1, text: TAG1 }, { id: TAG2, text: TAG2 }, { ... }]
	 *
	 * because `sanitize.pictures()` expects an Array and returns an Array,
	 * put updatedPhoto into an Array and
	 * just choose the 0-th element in returned Array
	 */
	.put(authenticate.sid, (req, res) => {
		const tags = req.body.tags.map(t => ({ id: t, text: t }));

		photoCTR
			.updateTags(req.params.id, tags)
			.then(updatedPhoto =>
				r.send(res, 200, sanitize.pictures([updatedPhoto])[0]),
			)
			.catch(err => r.error(res, err, `error updating tags of photo`));
	})

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
