const express = require('express');
// const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const Schema = mongoose.Schema;
const image = require('../photos/model');
const MLAB = JSON.parse(process.env.MLAB);
mongoose.connect(`mongodb://${MLAB.USER}:${MLAB.PASS}@${MLAB.URI}`);
const server = express();

server.use(multer({ dest: './api/photos/uploads/' }).single('image'));

server.post('/api/photo', (req, res) => {
  // console.log(req.file);
  let newItem = new image();
  newItem.img.data = fs.readFileSync(req.file.path)
  newItem.img.contentType = req.file.mimetype
  newItem.tags = req.body.tags;
  // console.log(newItem);
  newItem.save();
  res.send({ message: 'upload test'})
});

server.get('/', (req, res) => {
  console.log('Photo upload endpoint');
  res.send({ message: 'this route worked.' })
});

module.exports = server;