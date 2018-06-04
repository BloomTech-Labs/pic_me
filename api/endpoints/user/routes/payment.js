const router = require('express').Router();

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
const userCTR = require('../../../users/controller');

/**
 * general helper functions for all api endpoints
 */
const authenticate = require('../../../helpers/authenticate');
const r = require('../../../helpers/responses');
const sanitize = require('../../../helpers/sanitize');

/**
 * /api/users/payment
 * - POST: creates a charge to customer via Stripe
 */
router
	.route('/')

	/**
	 * POST /api/users/paymenet
	 *
	 * creates a charge to customer via Stripe
	 *
	 * checks for valid session cookie (user), then
	 * charges via Stripe APi, and if successful,
	 * adds credits to user
	 *
	 * returns:
	 * {
	 *    message: 'successfully logged out'
	 * }
	 */
	.post(authenticate.sid, (req, res) => {
		const token = req.body.stripeToken;
		const typeOfCharge = req.body.typeOfCharge;

		/**
		 * env config:
		 * STRIPE_PAYMENTS={"currency":"usd","sm":"199","lg":"999","description":{"sm":"small charge","lg":"large charge"}}
		 *
		 * remember that charges are in CENTS so:
		 * 199 = $1.99
		 * 999 = $9.99
		 *
		 * the minimum charge (as of June 1, 2018) is $0.50, or 50 cents
		 */
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
							r.send(res, 200, {
								captured: response.captured,
								user: sanitize.response(updatedUser),
							});
						})
						.catch(err =>
							r.send(res, 500, { err, message: `error updating credits` }),
						);

					return;
				}

				r.send(res, 500, { message: `failed to verify payment` });
			})
			.catch(err =>
				r.send(res, 500, { err, message: `error charging payment` }),
			);
	});

module.exports = router;
