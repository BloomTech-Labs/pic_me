const r = require('./responses');

/**
 * middleware that checks to see if a req.user is present
 *
 * req.user is automatically created when passport deserializes the session cookie
 */
exports.sid = (req, res, next) => {
	if (!req.user) {
		r.send(res, 422, { message: `session expired. please log in` });
		return;
	}

	next();
};
