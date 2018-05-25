const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
// const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const { dev, debug } = require('./dev');

const router = require('./router');
const passport = require('./api/auth/passport');

const MLAB = JSON.parse(process.env.MLAB);
mongoose.connect(`mongodb://${MLAB.USER}:${MLAB.PASS}@${MLAB.URI}`);

const server = express();

/* dev dependencies */
if (dev) {
  server.use(require('morgan')('combined'));
}

server.use(cors({ origin: JSON.parse(process.env.CORS), credentials: true }));
server.use(express.static(path.join(__dirname, 'client/build')));
server.use(express.json());

/* passport */
server.use(express.static('public'));
server.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(passport.initialize());
server.use(passport.session());
// server.use(flash());

server.use('/api', router);

server.get('/', (req, res) => {
  debug ? res.send({ server: `running` }) : null;
});

module.exports = server;
