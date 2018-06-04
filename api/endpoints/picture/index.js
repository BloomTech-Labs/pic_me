const router = require('express').Router();

// const { dev, debug } = require('../../../dev');

router.use('/', require('./routes/root'));
router.use('/upload', require('./routes/upload'));
router.use('/myuploads', require('./routes/myuploads'));


// router.route('/').get((req, res) => {
// 	debug ? res.send({ pictures: `running` }) : null;
// });

// router.route('/upload').post(transform.upload.array('images'), (req, res) => {
// 	  const uploaded = req.files;
//     const ownerId = req.user.id;

//     const uploadedImages = uploaded.map((i, idx) => {
//       let newImage = {};
//       // console.log(req.body.tags);
//       console.log('Tags =>', req.body.tags);
//       newImage.tags = req.body.tags;
//       newImage.url = i.transforms[0].location;
//       newImage.owner = req.user.id;
//       console.log(newImage);
//       return newImage;
//     });

//     image.insertMany(uploadedImages, function (error, docs) {
//       if (error) {
//         send(res, 500, { error, message: 'failed to save images' });
//         return;
//       }

//       const pictureIds = [];
//       docs.forEach(image => {
//         console.log('Image obj:', image);
//         pictureIds.push(image);
//       });

//       user
//         .update({ "_id": ownerId }, { "$push": { uploads: pictureIds } })
//         .then(editedUser => send(res, 200, sanitize.response(editedUser)))
//         .catch(err =>
//           send(res, 500, { err, message: `server failed to edit user` })
//         );
//     });
// 	// const uploaded = req.files;
// 	// uploaded.forEach(i => {
// 	// 	let newImage = new image();
// 	// 	// using shift() to make postman associate proper tags with image instead
// 	// 	// of just appending all tags from uploads as an array for each upload
// 	// 	newImage.tags = req.body.tags.shift();
// 	// 	newImage.url = i.transforms[0].location;
// 	// 	newImage.save();
// 	// });
// 	// // res.json(`Uploaded ${req.files.length} files!`);
// 	// res.send();
// });

// router.route('/myuploads').get(authenticate.sid, (req, res) => {
// 	userCTR
// 		.uploads(req.user.id)
// 		.then(users => r.send(res, 200, users))
// 		.catch(err =>
// 			r.send(res, 500, {
// 				err,
// 				message: `server error retrieving user uploads`,
// 			}),
// 		);
// });

// // router
// //   .route('/upload')
// //   .post(authenticate.sid, transform.upload.array('images'), (req, res) => {
// //     const uploaded = req.files;
// //     const ownerId = req.user.id;

// //     const uploadedImages = uploaded.map((i, idx) => {
// //       let newImage = {};
// //       // console.log(req.body.tags);
// //       console.log('Tags =>', req.body.tags);
// //       newImage.tags = req.body.tags;
// //       newImage.url = i.transforms[0].location;
// //       newImage.owner = req.user.id;
// //       console.log(newImage);
// //       return newImage;
// //     });

// //     image.insertMany(uploadedImages, function (error, docs) {
// //       if (error) {
// //         send(res, 500, { error, message: 'failed to save images' });
// //         return;
// //       }

// //       const pictureIds = [];
// //       docs.forEach(image => {
// //         console.log('Image obj:', image);
// //         pictureIds.push(image);
// //       });

// //       user
// //         .update({ "_id": ownerId }, { "$push": { uploads: pictureIds } })
// //         .then(editedUser => send(res, 200, sanitize.response(editedUser)))
// //         .catch(err =>
// //           send(res, 500, { err, message: `server failed to edit user` })
// //         );
// //     });
// //   });

// // router.route('/myuploads').get(authenticate.sid, (req, res) => {
// //   console.log(req.user);
// //   userCTR
// //     .uploads(req.user.id)
// //     .then(users => send(res, 200, users))
// //     .catch(err =>
// //       send(res, 500, { err, message: `server error retrieving user uploads` })
// //     )
// // })

// // 	// .delete(authenticate.sid, (req, res) => {
// // 	// 	userCTR
// // 	// 		.photoDelete(req.user.uploads("_id"))
// // 	// 		.then(_ => {
// // 	// 			req.logout();
// // 	// 			send(res, 200, `photo successfully deleted`);
// // 	// 		})
// // 	// 		.catch(err =>
// // 	// 			send(res, 500, { err, message: `server failed to delete photo` })
// // 	// 		);
// // 	// });

// // // router.route('/mycollection')

// // // router.route('/browse')

module.exports = router;
