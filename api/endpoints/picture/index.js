const router = require('express').Router();

const { dev, debug } = require('../../../dev');

// s3 storage
const transform = require('../../photos/transform');
const photoCTR = require('../../photos/controller');

const authenticate = require('../../helpers/authenticate');
const userCTR = require('../../users/controller');
const r = require('../../helpers/responses');

router.route('/').get((req, res) => {
	debug ? res.send({ pictures: `running` }) : null;
});

router.route('/upload').post(transform.upload.array('images'), (req, res) => {
	const uploaded = req.files;
	uploaded.forEach(i => {
		let newImage = new image();
		// using shift() to make postman associate proper tags with image instead
		// of just appending all tags from uploads as an array for each upload
		newImage.tags = req.body.tags.shift();
		newImage.url = i.transforms[0].location;
		newImage.save();
	});
	// res.json(`Uploaded ${req.files.length} files!`);
	res.send();
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
