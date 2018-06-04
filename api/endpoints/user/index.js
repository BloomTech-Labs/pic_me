const router = require('express').Router();

const { debug } = require('../../../dev');

/**
 * controller that interacts with the users table in database
 */
const userCTR = require('../../users/controller');

/**
 * general helper functions for all api endpoints
 */
const validate = require('../../helpers/validate/index');
const sanitize = require('../../helpers/sanitize');
const authenticate = require('../../helpers/authenticate');
const r = require('../../helpers/responses');

// TODO: MOVE THESE
const transform = require('../../photos/transform');
/* controllers */
// const photoCTR = require('../photos/controller')
const user = require('../../users/model');
const image = require('../../photos/model');
// Todo move pictureIds to user uploads array code into ctrl file

/**
 * /api/users
 *
 * routes for user endpoint
 */
router.use('/', require('./routes/root'));
router.use('/all', require('./routes/all'));
router.use('/auth', require('./routes/auth'));
router.use('/info', require('./routes/info'));
router.use('/login', require('./routes/login'));
router.use('/logout', require('./routes/logout'));
router.use('/payment', require('./routes/payment'));
router.use('/settings', require('./routes/settings'));

router
	.route('/upload')
	.post(authenticate.sid, transform.upload.array('images'), (req, res) => {
		const uploaded = req.files;
		const ownerId = req.user.id;
		console.log(req.files);

		// Todo add a check for duplicate uploads check originalname key
		const uploadedImages = uploaded.map((i, idx) => {
			let newImage = {};
			newImage.tags = req.body.tags;
			newImage.url = i.transforms[0].location;
			newImage.owner = req.user.id;
			return newImage;
		});

		image.insertMany(uploadedImages, function(error, docs) {
			if (error) {
				r.send(res, 500, { error, message: 'failed to save images' });
				return;
			}

			const pictureIds = [];
			docs.forEach(image => {
				// pictureIds.push(image._id);
				pictureIds.push(image.url);
			});

			user
				.update({ _id: ownerId }, { $push: { uploads: pictureIds } })
				.then(editedUser => r.send(res, 200, sanitize.response(editedUser)))
				.catch(err =>
					r.send(res, 500, { err, message: `server failed to edit user` }),
				);
		});
	});

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
