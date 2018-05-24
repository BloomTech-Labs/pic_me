const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const upload = require('multer');
const fs = require('fs');
const imgProcess = require('./process');
const Schema = mongoose.Schema;
const image = require('../photos/model');
const MLAB = JSON.parse(process.env.MLAB);
mongoose.connect(`mongodb://${MLAB.USER}:${MLAB.PASS}@${MLAB.URI}`);

const server = express();

server.get('/', (req, res) => {
	console.log('Photo upload endpoint');
	res.send({ message: 'this route worked.' });
});

server.post('/api/upload', upload.array('images'), (req, res) =>{
  impProcess.convert(req.files).then((imgArray) => {
    res.json(imgArray);
  })
});

