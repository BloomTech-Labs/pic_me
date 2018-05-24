const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const aws = require('aws-sdk');
const sharp = require('sharp');
const Schema = mongoose.Schema;
// const image = require('../photos/model');
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
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, {fieldName: 'images'});
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

server.post('/upload', upload.array('images', 3), (req, res, next) => {
  res.json(`Uploaded ${req.files.length} files!`);
})  

module.exports = server;
