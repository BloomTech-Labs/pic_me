const router = require('express').Router();

const { dev, debug } = require('../../../dev');

// s3 storage
const { upload } = require('../../photos/transform');
const photoCTR = require('../../photos/controller');

const authenticate = require('../../helpers/authenticate');
const userCTR = require('../../users/controller');
const r = require('../../helpers/responses');
const image = require('../../photos/model');
const user = require('../../users/model');
const sanitize = require('../../helpers/sanitize');

router.route('/').get((req, res) => {
	debug ? res.send({ pictures: `running` }) : null;
});

router.route('/upload').post(upload.array('images'), (req, res) => {
	const uploaded = req.files;
	const ownerId = req.user.id;
	console.log('in /upload');

	const uploadedImages = uploaded.map((i, idx) => {
		let newImage = {};
		// console.log(req.body.tags);
		console.log('Tags =>', req.body.tags);
		newImage.tags = JSON.parse(req.body.tags);
		newImage.url = i.transforms[0].location;
		newImage.owner = req.user.id;
		console.log('newimage', newImage);
		return newImage;
	});

	image.insertMany(uploadedImages, function(error, docs) {
		if (error) {
			r.send(res, 500, { error, message: 'failed to save images' });
			return;
		}

		const pictureIds = [];
		docs.forEach(image => {
			// console.log('Image obj:', image);
			pictureIds.push(image._id);
		});

		console.log('pciture ids', pictureIds);
		console.log('fpciture ids 0', pictureIds[0]);
		console.log('typeofpciture ids', typeof pictureIds[0]);

		user
			.findOneAndUpdate(
				{ _id: ownerId },
				{ $push: { uploads: pictureIds } },
				{ new: true },
			)
			.then(editedUser => r.send(res, 200, sanitize.response(editedUser)))
			.catch(err =>
				r.send(res, 500, { err, message: `server failed to edit user` }),
			);
	});
	// const uploaded = req.files;
	// uploaded.forEach(i => {
	// 	let newImage = new image();
	// 	// using shift() to make postman associate proper tags with image instead
	// 	// of just appending all tags from uploads as an array for each upload
	// 	newImage.tags = req.body.tags.shift();
	// 	newImage.url = i.transforms[0].location;
	// 	newImage.save();
	// });
	// // res.json(`Uploaded ${req.files.length} files!`);
	// res.send();
});

router.route('/myuploads').get(authenticate.sid, (req, res) => {
	userCTR
		.uploads(req.user.id)
		.then(user => {
			const pictures = [];

			user.uploads.forEach(picture => {
				const newPicture = {};

				newPicture.id = picture._id;
				newPicture.url = picture.url;
				newPicture.tags = picture.tags;

				pictures.push(newPicture);
			});

			r.send(res, 200, pictures);
		})
		.catch(err =>
			r.send(res, 500, {
				err,
				message: `server error retrievin	g user uploads`,
			}),
		);
});

router.route(`/myuploads/:id`).delete(authenticate.sid, (req, res) => {
	photoCTR
		.deletePhoto(req.params.id)
		.then(_ => r.send(res, 200, { message: `photo deleted` }))
		.catch(err => r.error(res, err, `error deleting photo`));
});

module.exports = router;
