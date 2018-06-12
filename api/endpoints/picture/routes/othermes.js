const router = require('express').Router();

const { debug } = require('../../../../dev');

/**
 * controller that interacts with the photos table in database
 */
const photoCTR = require('../../../photos/controller');

/**
 * controller that interacts with the users table in database
 */
const userCTR = require('../../../users/controller');

/**
 * general helper functions for all api endpoints
 */
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');
const sanitize = require('../../../helpers/sanitize');
const validate = require('../../../helpers/validate');

/**
 * /api/pictures/othermes
 *
 * - GET: retrieves pictures of user uploaded by other users
 */
router
	.route('/')

	/**
	 * GET /api/pictures/othermes
	 *
	 * retrieves pictures of user uploaded by other users, then
	 * filter photos to make sure they are not in user's collection already
	 *
	 * req.othermes is from photoCTR.getPhotosOf (all unfiltered photos of user)
	 * req.photos is from userCTR.photos (the user's already claimed photos)
	 *
	 * note: use `JSON.stringify` to check picture `ObjectId`s
	 */
	.get(authenticate.sid, photoCTR.getPhotosOf, userCTR.photos, (req, res) => {
		const collectionPhotosIds = req.photos.map(p => JSON.stringify(p._id));

		const filteredPhotos = req.othermes.filter(
			photo => !collectionPhotosIds.includes(JSON.stringify(photo._id)),
		);

		r.send(res, 200, sanitize.pictures(filteredPhotos));
	});

/**
 * /api/pictures/othermes/:id
 *
 * - POST: claim a picture
 */
router
	.route('/:id')

	/**
	 * make sure user has credits, then
	 * retrieve picture, then
	 * add photo ref to user's photo
	 * if successful, add credits to original user
	 */
	.post(authenticate.sid, validate.credits, (req, res) => {
		photoCTR
			.request({ _id: req.params.id })
			.then(photo => {
				const photoId = [];
				photoId.push(photo._id);

				userCTR.user
					.findOneAndUpdate(
						{ _id: req.user.id },
						{ $push: { photos: photoId }, $inc: { balance: -1 } },
						{ new: true },
					)
					.then(updatedUser => {
						const ownerId = photo.owner;

						userCTR
							.update(photo.owner, { $inc: { balance: 1 } })
							.then(_ => r.send(res, 200, sanitize.response(updatedUser)))
							.catch(err =>
								r.error(res, err, `failed to credit owner of phoo`),
							);
					})
					.catch(err =>
						r.error(res, err, `server failed to add photo to collection`),
					);
			})
			.catch(err => r.error(res, err, `server failed to locate picture`));
	});

module.exports = router;
