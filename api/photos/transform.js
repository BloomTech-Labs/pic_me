const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const aws = require('aws-sdk');
const sharp = require('sharp');
const Schema = mongoose.Schema;
const image = require('../photos/model');
const MLAB = JSON.parse(process.env.MLAB);
mongoose.connect(`mongodb://${MLAB.USER}:${MLAB.PASS}@${MLAB.URI}`);

const server = express();

const awsAccessKey = process.env.AWS_KEY;
const awsSecretKey = process.env.AWS_SECRET;

aws.config.update({
	secretAccessKey: awsSecretKey,
	accessKeyId: awsAccessKey,
});

let s3 = new aws.S3();

exports.upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.BUCKET,
		// acl permissions 'public-read'
		acl: 'public-read',
		contentType: multerS3.AUTO_CONTENT_TYPE,
		// should transform
		shouldTransform: true,
		// transforms
		// Todo add a thumbnail version
		// Todo tweak resizing options see (nearest, cubic, lanczos2)
		transforms: [
			{
				id: 'original',
				key: function(req, file, cb) {
					let fileSplit = file.originalname.split('.');

					let filename = fileSplit.slice(0, fileSplit.length - 1);
					filename.push(Date.now());
					filename = filename.join('_') + '.' + fileSplit[fileSplit.length - 1];

					cb(null, filename);
				},
				transform: function(req, file, cb) {
					cb(null, sharp().resize(293, 293));
				},
			},
		],
		metadata: function(req, file, cb) {
			cb(null, { fieldName: 'images', fieldName: 'tags' });
		},
	}),
});

// server.get('/', (req, res) => {
//   console.log('Photo upload endpoint');
//   res.send({ message: 'this route worked.' });
// });

// server.post('/upload', upload.array('images'), (req, res, next) => {
//   const uploads = req.files
//   uploads.forEach(i => {
//     let newImage = new image();
//     // using shift() to make postman associate proper tags with image instead
//     // of just appending all tags from uploads as an array for each upload
//     newImage.tags = req.body.tags.shift();
//     newImage.url = i.transforms[0].location;
//     newImage.save();
//   })
//   res.json(`Uploaded ${req.files.length} files!`);
// })

// module.exports = server;
