const send = require('../../helpers/send');
const {
	checkEmailAndPassword,
	checkEmailOrPassword,
	// checkForSameEmailOrPassword,
	checkFirstnameAndLastname,
	checkNicknames,
	// checkIdAndLoggedInId,
	checkUser,
	checkForChangedFields,
} = require('./helper');

/**
 * validate.signup checks for these fields in req.body:
 * - email
 * - password (unhashed)
 * - firstName
 * - lastName
 *
 * sanitize.user} req
 */
exports.signup = (req, res, next) => {
	const { email, password, firstName, lastName } = req.body;

	if (!checkEmailAndPassword(res, email, password)) return;
	if (!checkFirstnameAndLastname(res, firstName, lastName)) return;
	// if (!checkNicknames(res, nickNames)) return;

	next();
};

exports.login = (req, res, next) => {
	/* check if there is a user logged in already */
	if (req.user) {
		send(res, 422, { message: `user (${req.user.email}) already logged in` });
		return;
	}

	const { email, password } = req.body;

	checkEmailAndPassword(res, email, password);

	next();
};

// exports.user = (req, res, next) => {
//   // const { id } = req.body;
//   // const loggedInId = req.user.id;

//   // if (!checkIdAndLoggedInId(res, id, loggedInId)) return;

//   next();
// };

exports.update = (req, res, next) => {
	if (!checkUser(res, req.body.user)) return;
	if (!checkForChangedFields(res, req, req.body.user)) return;

	next();
};

exports.settingsData = (req, res, next) => {
	const { email, password } = req.body.user;

	if (!checkEmailOrPassword(res, email, password)) return;
	// if (!checkForSameEmailOrPassword(res, req.user, email, password)) return;

	next();
};
