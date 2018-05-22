const server = require('./server');

const debug = process.env.DEBUG === 'true' || false; /* convert str to bool */
const port = process.env.PORT || 5000;

server.listen(process.env.PORT || port, _ => {
  debug ? console.log(`Listening on port: ${port}`) : null;
});
