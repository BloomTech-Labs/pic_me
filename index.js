const server = require('./server');

const { dev, debug } = require('./dev');

const port = process.env.PORT || 5000;

server.listen(port, _ => {
  debug ? console.log(`Listening on port: ${port}`) : null;
});
