require('dotenv').config();

const server = require('./server');

const port = process.env.PORT || 5000;
const debug = process.env.DEBUG === 'true' || false; /* convert str to bool */

server.listen(process.env.PORT || port, _ => {
  debug ? console.log(`Listening on port: ${port}`) : null;
});
