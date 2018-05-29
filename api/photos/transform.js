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
})

let s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'firespray31',
    // acl permissions
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // should transform
    shouldTransform: true,
    // transforms
    transforms: [{
      id: 'original',
      key: function (req, file, cb) {
        let fileSplit = file.originalname.split('.')

        let filename = fileSplit.slice(0, fileSplit.length - 1)
        filename.push(Date.now())
        filename = filename.join('_') + '.' + fileSplit[fileSplit.length - 1]

        cb(null, filename)
      },
      transform: function (req, file, cb) {
        cb(null, sharp().resize(293, 293))
      }
    }],
    metadata: function(req, file, cb) {
      cb(null, {fieldName: 'images'});
    },
  })
})

server.get('/', (req, res) => {
  console.log('Photo upload endpoint');
  res.send({ message: 'this route worked.' });
});

// ? .array(fieldname[, maxCount]) should uploads be limited to n amount of images
server.post('/upload', upload.array('images'), (req, res, next) => {
  // Todo Need to access the location key on the transform object
  // * Add logic to convert non jpg to jpg format or disallow the upload
  // ? How will tags be handled
  // * Add a url parameter to photoschema that points to image's s3 location
  console.log(req.files);
  let uploads = req.files
  uploads.forEach(image => {
    console.log(image.transforms[0].location);
  })
  // images.insertMany(uploads, function(error, docs) {});
  res.json(`Uploaded ${req.files.length} files!`);
})  

module.exports = server;
