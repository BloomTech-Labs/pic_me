const router = require('express').Router();

const { debug } = require('../../../../dev');

const send = require('../../../helpers/send');

/**
 * /api/users (`/`)
 * - GET:    used for debug only
 * - POST:   creates a new user
 * - PUT:    edits the user's non-sensitive info
 * - DELETE: deletes the user
 */
router
	.route('/')
	.get((req, res) => {
		debug ? send(res, 200, { users: `running` }) : null;
	})
	/**
	 * POST /api/users
	 *
	 * creates a new user
	 *
	 * expects (in req.body):
	 * {
	 *    email: 'my@email.com',
	 *    password: 'unhashedPassword',
	 *    firstName: 'John',
	 *    lastName: 'Doe'
	 * }
	 *
	 * returns:
	 * {
	 *
	 * }
	 *
	 */
	.post(validate.signup, sanitize.user, (req, res) => {
		userCTR
			.create(req.newUser)
			.then(savedUser => send(res, 201, sanitize.response(savedUser)))
			.catch(err =>
				send(res, 500, { err, message: `server failed to save new user` }),
			);
	})
	.put(authenticate.sid, validate.update, sanitize.update, (req, res) => {
		userCTR
			.update(req.user.id, req.editedUser)
			.then(editedUser => send(res, 200, sanitize.response(editedUser)))
			.catch(err =>
				send(res, 500, { err, message: `server failed to edit user` }),
			);
	})
	.delete(authenticate.sid, (req, res) => {
		userCTR
			.delete(req.user.id)
			.then(_ => {
				req.logout();

				send(res, 200, `user successfully deleted`);
			})
			.catch(err =>
				send(res, 500, { err, message: `server failed to delete user` }),
			);
	});

module.exports = router;
