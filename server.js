const debug = process.env.DEBUG === 'true'; /* convert str to bool */

const express = require('express');
const path = require('path');
const cors = require('cors');

const router = require('./router');

const server = express();

/* dev dependencies */
if (debug) {
  server.use(require('morgan')('combined'));
}

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
