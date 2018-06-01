const router = require('express').Router();

const { debug } = require('../../../dev');

/**
 * passport with strategies and settings
 */
const passport = require('../../auth/passport');

/**
 * env config:
 * STRIPE_SECRET=sk_test_BQokikJOvBiI2HlWgH4olfQ2
 *
 * demo test secret key above, found below:
 * https://stripe.com/docs/charges
 *
 * to find your api keys:
 * https://dashboard.stripe.com/account/apikeys
 *
 */
const stripe = require('stripe')(process.env.STRIPE_SECRET);

/**
 * controller that interacts with the users table in database
 */
const userCTR = require('../../users/controller');

/**
 * general helper functions for all api endpoints
 */
const validate = require('../../helpers/validate/validate');
const sanitize = require('../../helpers/sanitize');
const authenticate = require('../../helpers/authenticate');
const send = require('../../helpers/send');

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

/* this route is used to update sensitive settings, such as passwords and email */
router
	.route('/settings')
	.put(
		authenticate.sid,
		validate.settingsData,
		sanitize.settingsData,
		(req, res) => {
			userCTR
				.requestById(req.user.id)
				.then(user => {
					const { email, password } = req.settings;

					if (email) user.email = email;
					if (password) user.password = password;

					user
						.save()
						.then(savedUser => {
							// req.logout();
							send(res, 200, sanitize.response(savedUser));
						})
						.catch(err =>
							send(res, 500, { err, message: `error updating user settings` }),
						);
				})
				.catch(err =>
					send(res, 500, { err, message: `error finding user by id` }),
				);
		},
	);

router.route('/info').get(authenticate.sid, (req, res) => {
	send(res, 200, sanitize.response(req.user));
});

router
	.route('/login')
	.post(validate.login, passport.authenticate('local'), (req, res) => {
		send(res, 200, `user authenticated`);
	});

router.route('/login/check').post(authenticate.sid, (req, res) => {
	/* if authenticate sid passed, cookie is valid */
	send(res, 200, {
		message: `user verified`,
		user: sanitize.response(req.user),
	});
});

router.route('/auth/twitter').get(passport.authenticate('twitter'));

router.route('/auth/twitter/callback').get(
	passport.authenticate('twitter', { failureRedirect: '/login' }),
	function(req, res) {
		// res.send({ message: `twitter authenticated` });
		// Successful authentication, redirect home.
		res.redirect('/');
	},
	// passport.authenticate('twitter', {
	// 	successRedirect: '/',
	// 	failureRedirect: '/login',
	// }),
);

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
				send(res, 500, { error, message: 'failed to save images' });
				return;
			}

			const pictureIds = [];
			docs.forEach(image => {
				// pictureIds.push(image._id);
				pictureIds.push(image.url);
			});

			user
				.update({ _id: ownerId }, { $push: { uploads: pictureIds } })
				.then(editedUser => send(res, 200, sanitize.response(editedUser)))
				.catch(err =>
					send(res, 500, { err, message: `server failed to edit user` }),
				);
		});
	});

router.route('/myuploads').get(authenticate.sid, (req, res) => {
	userCTR
		.uploads(req.user.id)
		.then(users => send(res, 200, users))
		.catch(err =>
			send(res, 500, { err, message: `server error retrieving user uploads` }),
		);
});

router.route('/logout').get(authenticate.sid, (req, res) => {
	req.logout();
	send(res, 200, `user logged out`);
});

router.route('/all').get(authenticate.sid, (req, res) => {
	userCTR
		.request()
		.then(users => send(res, 200, users))
		.catch(err =>
			send(res, 500, { err, message: `server error retrieving users` }),
		);
});

// TODO: custom callback not working atm
// router.route('/login').post((req, res) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err)
//       res
//         .status(500)
//         .send({ err, message: `server failed verify credentials` });
//     if (!user) res.status(422).send({ message: `user not found` });

//     req.login(user, err => {
//       if (err) res.status(500).send({ err, message: `server failed to login` });

//       res.send(`user logged in`);
//     });
//   });
// });

router.route('/payment').post(authenticate.sid, (req, res) => {
	const token = req.body.stripeToken;
	const typeOfCharge = req.body.typeOfCharge;

	const stripeSettings = JSON.parse(process.env.STRIPE_PAYMENTS);

	const amount = +stripeSettings[typeOfCharge];
	const currency = stripeSettings.currency;
	const description = stripeSettings.description[typeOfCharge];

	stripe.charges
		.create({
			amount,
			currency,
			description,
			source: token,
		})
		.then(response => {
			/**
			 * if payment is successfully captured, add credits to account,
			 * otherwise send error message
			 */
			if (response.captured) {
				userCTR
					.update(req.user.id, { $inc: { balance: 10 } })
					.then(updatedUser => {
						send(res, 200, {
							captured: response.captured,
							user: sanitize.response(updatedUser),
						});
					})
					.catch(err =>
						send(res, 500, { err, message: `error updating credits` }),
					);

				return;
			}

			send(res, 500, { message: `failed to verify payment` });
		})
		.catch(err => send(res, 500, { err, message: `error charging payment` }));
});

module.exports = router;
