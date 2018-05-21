require('dotenv').config();
const debug = process.env.DEBUG === 'true' || false; /* convert str to bool */

const morgan = debug ? require('morgan') : null;

const express = require('express');
const path = require('path');
const cors = require('cors');

const router = require('./router');

const server = express();

debug ? server.use(morgan('combined')) : null;
server.use(cors({ origin: 'http://localhost:3000', credentials: true }));
server.use(express.static(path.join(__dirname, 'client/build')));
server.use(express.json());

server.use('/api', router);

server.get('/', (req, res) => {
  debug
    ? res.send({ server: `running` })
    : res.status(404).send({ message: `debug set to false` });
});

module.exports = server;
